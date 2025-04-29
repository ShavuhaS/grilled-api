import { Injectable } from '@nestjs/common';
import { DbCourse } from '../../../database/entities/course.entity';
import { BaseCourseResponse } from '../../../common/responses/base-course.response';
import { TeacherMapper } from '../../teacher/mappers/teacher.mapper';
import { CourseCategoryMapper } from '../../course-category/mappers/course-category.mapper';
@Injectable()
export class CourseMapper {
  constructor (
    private teacherMapper: TeacherMapper,
    private categoryMapper: CourseCategoryMapper,
  ) {}

  toBaseCourseResponse (course: DbCourse): BaseCourseResponse {
    return {
      id: course.id,
      author: this.teacherMapper.toCourseTeacherResponse(course.author),
      category: this.categoryMapper.toBaseCourseCategoryResponse(course.category),
      about: course.about,
      name: course.name,
      level: course.level,
      status: course.status,
      enrolledCount: course.enrolledCount,
      estimatedTime: course.estimatedTime,
      rating: course.avgRating.toNumber(),
    };
  }
}