import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../database/repositories/course.repository';
import { CreateCourseDto } from '../../common/dtos/create-course.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { DbUser } from '../../database/entities/user.entity';

@Injectable()
export class CourseService {
  constructor (private courseRepository: CourseRepository) {}

  async create (user: DbUser, body: CreateCourseDto): Promise<DbCourse> {
    return this.courseRepository.create({
      ...body,
      authorId: user.id,
    }, {
      author: {
        include: {
          user: {
            include: {
              teacher: true,
            },
          },
        },
      },
      category: true,
    });
  }
}
