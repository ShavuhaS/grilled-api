import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../database/repositories/teacher.repository';
import { UpdateTeacherDto } from 'src/common/dtos/update-teacher.dto';
import { DbTeacher } from '../../database/entities/teacher.entity';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { QueryTeacherCoursesDto } from '../../common/dtos/query-teacher-courses.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { Paginated } from '../../database/interfaces/paginated.interface';
import { SearchUtil } from '../../database/utils/search.util';
import { FilterUtil } from '../../database/utils/filter.util';
import { PaginationUtil } from '../../database/utils/pagination.util';
import { CourseRepository } from '../../database/repositories/course.repository';
import { CourseService } from '../course/course.service';

@Injectable()
export class TeacherService {
  constructor(
    private teacherRepository: TeacherRepository,
    private courseRepository: CourseRepository,
    private courseService: CourseService,
  ) {}

  async update(id: string, dto: UpdateTeacherDto): Promise<DbTeacher> {
    const teacher = await this.teacherRepository.find({ userId: id });

    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }

    return this.teacherRepository.update({ userId: id }, dto);
  }

  async getCourses(
    id: string,
    query: QueryTeacherCoursesDto,
    orderBy: OrderByDto,
  ): Promise<Paginated<DbCourse>> {
    const { search, orderBy: _, pageSize, page, ...filter } = query;
    const pagination = { pageSize, page };

    const searchFilter = search
      ? SearchUtil.getFieldSearch<'course'>(search, 'name')
      : {};

    const whereFilter = FilterUtil.getFilter('DbCourse', filter);

    const where = {
      ...searchFilter,
      ...whereFilter,
      authorId: id,
    };

    const paginated = await PaginationUtil.paginate<'course', DbCourse>(
      this.courseRepository,
      { where, orderBy },
      pagination,
    );

    for (const course of paginated.data) {
      await this.courseService.signCourseResources(course);
    }

    return paginated;
  }
}
