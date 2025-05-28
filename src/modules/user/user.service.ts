import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { DbUser } from '../../database/entities/user.entity';
import { UpdateUserDto } from '../../common/dtos/update-user.dto';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { StorageService } from '../storage/storage.service';
import { QueryUserCoursesDto } from 'src/common/dtos/query-user-courses.dto';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { Paginated } from '../../database/interfaces/paginated.interface';
import { PaginationUtil } from '../../database/utils/pagination.util';
import { UserCourseRepository } from '../../database/repositories/user-course.repository';
import { SearchUtil } from '../../database/utils/search.util';
import { DbUserCourse } from '../../database/entities/user-course.entity';
import { Prisma } from '@prisma/client';
import { UserCourseStatus } from '../../common/enums/user-course-status.enum';
import { CourseService } from '../course/course.service';
import { DbCourse } from '../../database/entities/course.entity';
import { PaginatedUserCoursesResponse } from '../../common/responses/paginated-user-courses.response';
import { CourseMapper } from '../course/mappers/course.mapper';
import { CourseWithProgressResponse } from '../../common/responses/course-with-progress.response';
import { RoleEnum } from '../../common/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userCourseRepository: UserCourseRepository,
    private storageService: StorageService,
    private courseService: CourseService,
    private courseMapper: CourseMapper,
  ) {}

  async getById(id: string, signAvatar = false): Promise<DbUser> {
    const user = await this.userRepository.findById(id, {
      teacher: true,
    });

    if (signAvatar && user.avatar) {
      user.avatar = await this.storageService.getSignedUrl(user.avatar);
    }

    return user;
  }

  async updateById(id: string, dto: UpdateUserDto): Promise<DbUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    return this.userRepository.updateById(id, dto, { teacher: true });
  }

  async updateAvatar(id: string, avatar: Express.Multer.File): Promise<DbUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    const { storagePath } = await this.storageService.uploadAvatar(avatar);
    const updated = await this.userRepository.updateById(
      id,
      { avatar: storagePath },
      { teacher: true },
    );

    if (user.avatar) {
      await this.storageService.deleteFile(user.avatar);
    }

    updated.avatar = await this.storageService.getSignedUrl(updated.avatar);
    return updated;
  }

  async getAllUserCourses(
    user: DbUser,
    query: QueryUserCoursesDto,
    orderBy: OrderByDto,
  ): Promise<Paginated<DbCourse>> {
    if (user.role === RoleEnum.TEACHER) {
      throw new ForbiddenException();
    }

    const { search, skillId, page, pageSize, status, categoryId } = query;
    const pagination = { page, pageSize };

    let where: Prisma.UserCourseWhereInput = { course: {} };

    where.course = search
      ? SearchUtil.getFieldSearch<'course'>(search, 'name')
      : {};

    if (Array.isArray(skillId?.in) && skillId.in.length > 0) {
      where.course = { ...where.course, skills: { some: { skillId } } };
    }

    if (Array.isArray(status?.in) && status.in.length > 0) {
      const hasActive = status.in.includes(UserCourseStatus.ACTIVE);
      const hasArchived = status.in.includes(UserCourseStatus.ARCHIVED);

      if (hasActive && !hasArchived) {
        where.NOT = { userId: user.id, certificate: { isNot: null } };
      } else if (!hasActive && hasArchived) {
        where = { ...where, userId: user.id, certificate: { isNot: null } };
      } else {
        where.userId = user.id;
      }
    } else {
      where.userId = user.id;
    }

    if (Array.isArray(categoryId?.in) && categoryId.in.length > 0) {
      where.course.categoryId = { in: categoryId.in };
    }

    if (Array.isArray(orderBy)) {
      orderBy = orderBy.map((order) => {
        const key = Object.keys(order)[0];
        const value = order[key];
        if (key !== 'lastProgressAt') {
          return { course: { [key]: value } };
        }
        return { [key]: value };
      }) as any;
    }

    const paginated = await PaginationUtil.paginate<'userCourse', DbUserCourse>(
      this.userCourseRepository,
      {
        where,
        orderBy,
        include: {
          course: {
            include: {
              category: true,
              author: { include: { user: true } },
              modules: { include: { lessons: true } },
            },
          },
        },
      },
      pagination,
    );

    const courses = paginated.data.map((uc) => uc.course);

    for (const course of courses) {
      await this.courseService.signCourseResources(course);
    }

    return { data: courses, pagination: paginated.pagination };
  }

  async getCoursesProgress(
    userId: string,
    courses: Paginated<DbCourse>,
  ): Promise<PaginatedUserCoursesResponse> {
    const { data, pagination } = courses;

    const withProgress: CourseWithProgressResponse[] = [];
    for (const course of data) {
      const progress = await this.courseService.getUserProgress(userId, course);
      withProgress.push({
        ...this.courseMapper.toBaseCourseResponse(course),
        progress: progress.course,
      });
    }

    return {
      pagination,
      data: withProgress,
    };
  }
}
