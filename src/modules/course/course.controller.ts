import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SetAbilityFactory } from '../../common/guards/casl/set-ability-factory.meta';
import { CourseAbilityFactory } from '../casl/factories/course-ability.factory';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { CoursePolicies } from '../casl/policies/course';
import { CourseDocumentation } from '../../common/documentation/modules/course';

@ApiTags('Courses')
@Controller({
  path: '/courses',
  version: '1',
})
@SetAbilityFactory(CourseAbilityFactory)
export class CourseController {
  @ApiEndpoint({
    summary: 'Enroll onto a course',
    documentation: CourseDocumentation.ENROLL,
    policies: CoursePolicies.ENROLL,
  })
  @Post('/:courseId/enroll')
  async enroll () {
    return 'Test';
  }
}
