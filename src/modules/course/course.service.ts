import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../database/repositories/course.repository';
import { CreateCourseDto } from '../../common/dtos/create-course.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { DbUser } from '../../database/entities/user.entity';
import { CreateCourseModuleDto } from '../../common/dtos/create-course-module.dto';
import { DbCourseModule } from '../../database/entities/course-module.entity';
import { CourseModuleRepository } from '../../database/repositories/course-module.repository';

@Injectable()
export class CourseService {
  constructor (
    private courseRepository: CourseRepository,
    private courseModuleRepository: CourseModuleRepository,
  ) {}

  async getById (id: string): Promise<DbCourse> {
    return this.courseRepository.findById(id, {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    });
  }

  async create (user: DbUser, body: CreateCourseDto): Promise<DbCourse> {
    return this.courseRepository.create({
      ...body,
      authorId: user.id,
    });
  }

  async createModule (courseId: string, body: CreateCourseModuleDto): Promise<DbCourseModule> {
    const modules = await this.courseModuleRepository.findMany({
      where: { courseId },
      orderBy: {
        order: 'desc',
      },
    });

    let order = 1;
    if (modules.length > 0) order = modules[0].order + 1;

    return await this.courseModuleRepository.create({
      ...body,
      order,
      course: {
        connect: { id: courseId },
      },
    }, {
      lessons: {
        orderBy: {
          order: 'asc',
        },
      },
    });
  }

  async deleteModule (moduleId: string) {
    const { courseId, order } = await this.courseModuleRepository.delete({
      id: moduleId,
    });

    await this.courseModuleRepository.updateMany({
      courseId,
      order: {
        gt: order,
      },
    }, {
      order: {
        decrement: 1,
      },
    });
  }
}
