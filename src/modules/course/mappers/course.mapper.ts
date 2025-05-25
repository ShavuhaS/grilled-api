import { Injectable } from '@nestjs/common';
import { DbCourse } from '../../../database/entities/course.entity';
import { BaseCourseResponse } from '../../../common/responses/base-course.response';
import { TeacherMapper } from '../../teacher/mappers/teacher.mapper';
import { CourseCategoryMapper } from '../../course-category/mappers/course-category.mapper';
import { CourseResponse } from '../../../common/responses/course.response';
import { CourseModuleMapper } from '../../course-module/mappers/course-module.mapper';
import { CourseMappingOptions } from '../interfaces/course-mapping-options.interface';

@Injectable()
export class CourseMapper {
  constructor(
    private teacherMapper: TeacherMapper,
    private categoryMapper: CourseCategoryMapper,
    private moduleMapper: CourseModuleMapper,
  ) {}

  toBaseCourseResponse(course: DbCourse): BaseCourseResponse {
    return {
      id: course.id,
      author: this.teacherMapper.toCourseTeacherResponse(course.author),
      category: this.categoryMapper.toBaseCourseCategoryResponse(
        course.category,
      ),
      about: course.about,
      name: course.name,
      level: course.level,
      status: course.status,
      enrolledCount: course.enrolledCount,
      estimatedTime: course.estimatedTime,
      rating: course.avgRating.toNumber(),
    };
  }

  toCourseResponse(
    course: DbCourse,
    { links, progress }: CourseMappingOptions,
  ): CourseResponse {
    const modules =
      course.modules?.map((module, ind) =>
        this.moduleMapper.toCourseModuleResponse(module, {
          links,
          ...progress?.modules[ind],
        }),
      ) ?? [];

    return {
      ...this.toBaseCourseResponse(course),
      progress: progress && +progress.course.toFixed(1),
      modules,
    };
  }
}
