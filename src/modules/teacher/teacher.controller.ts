import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { User } from '../../common/decorators/user.decorator';
import { DbUser } from '../../database/entities/user.entity';
import { SetAbilityFactory } from '../../common/guards/casl/set-ability-factory.meta';
import { TeacherAbilityFactory } from '../casl/factories/teacher-ability.factory';
import { TeacherDocumentation } from '../../common/documentation/modules/teacher';
import { TeacherPolicies } from '../casl/policies/teacher';
import { UpdateTeacherDto } from '../../common/dtos/update-teacher.dto';
import { TeacherMapper } from './mappers/teacher.mapper';
import { QueryTeacherCoursesDto } from '../../common/dtos/query-teacher-courses.dto';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { CourseMapper } from '../course/mappers/course.mapper';

@ApiTags('Teachers')
@Controller({
  path: '/teachers',
  version: '1',
})
@SetAbilityFactory(TeacherAbilityFactory)
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private teacherMapper: TeacherMapper,
    private courseMapper: CourseMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Update teacher info',
    documentation: TeacherDocumentation.UPDATE_ME,
    policies: TeacherPolicies.UPDATE_ME,
  })
  @Patch('/me')
  async updateMe(@User() user: DbUser, @Body() dto: UpdateTeacherDto) {
    const teacher = await this.teacherService.update(user.id, dto);
    return this.teacherMapper.toBaseTeacherResponse(teacher);
  }

  @ApiEndpoint({
    summary: 'Get teacher courses',
    documentation: TeacherDocumentation.GET_COURSES,
    policies: TeacherPolicies.GET_COURSES,
  })
  @Get('/me/courses')
  async getCourses(
    @User() user: DbUser,
    @Query('orderBy', new OrderByPipe(DbCourse)) orderBy: OrderByDto,
    @Query() query: QueryTeacherCoursesDto,
  ) {
    const paginatedCourses = await this.teacherService.getCourses(
      user.id,
      query,
      orderBy,
    );
    return this.courseMapper.toPaginatedCoursesResponse(paginatedCourses);
  }
}
