import { Injectable } from '@nestjs/common';
import { DbCourse } from '../../../database/entities/course.entity';
import { BaseCourseResponse } from '../../../common/responses/base-course.response';
import { TeacherMapper } from '../../teacher/mappers/teacher.mapper';
import { CourseCategoryMapper } from '../../course-category/mappers/course-category.mapper';
import { CourseResponse } from '../../../common/responses/course.response';
import { CourseModuleMapper } from './course-module.mapper';
@Injectable()
export class CourseMapper {
  constructor (
    private teacherMapper: TeacherMapper,
    private categoryMapper: CourseCategoryMapper,
    private moduleMapper: CourseModuleMapper,
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

  toCourseResponse (course: DbCourse): CourseResponse {
    return {
      ...this.toBaseCourseResponse(course),
      modules: course.modules?.map((module) =>
        this.moduleMapper.toBaseCourseModuleResponse(module)
      ),
    };
  }
}