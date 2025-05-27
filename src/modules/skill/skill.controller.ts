import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { SkillDocumentation } from '../../common/documentation/modules/skill';
import { QuerySkillsDto } from '../../common/dtos/query-skills.dto';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { SkillMapper } from './mappers/skill.mapper';
import { DbSkill } from '../../database/entities/skill.entity';
import { JwtGuard } from '../../common/guards/auth/jwt.guard';
import { SkillByIdPipe } from '../../common/pipes/skill-by-id.pipe';
import { AttachEntitiesDto } from '../../common/dtos/attach-entities.dto';
import { User } from '../../common/decorators/user.decorator';
import { DbUser } from '../../database/entities/user.entity';
import { SetAbilityFactory } from '../../common/guards/casl/set-ability-factory.meta';
import { SkillAbilityFactory } from '../casl/factories/skill-ability.factory';
import { SkillPolicies } from '../casl/policies/skill';
import { DetachEntitiesDto } from '../../common/dtos/detach-entities.dto';

@ApiTags('Skills')
@Controller({
  path: '/skills',
  version: '1',
})
@SetAbilityFactory(SkillAbilityFactory)
export class SkillController {
  constructor(
    private skillService: SkillService,
    private skillMapper: SkillMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all course skills',
    documentation: SkillDocumentation.GET_ALL,
  })
  @Get('/')
  async getAll(
    @Query() query: QuerySkillsDto,
    @Query('orderBy', new OrderByPipe(DbSkill)) orderBy: OrderByDto,
  ) {
    const skills = await this.skillService.getAll(query, orderBy);
    return this.skillMapper.toPaginatedSkillsResponse(skills);
  }

  @ApiEndpoint({
    summary: 'Follow course categories',
    documentation: SkillDocumentation.FOLLOW,
    policies: SkillPolicies.FOLLOW,
  })
  @Post('/follow')
  async followSkills(
    @Body('ids', SkillByIdPipe) ids: string[],
    @Body() body: AttachEntitiesDto,
    @User() user: DbUser,
  ) {
    await this.skillService.addFolower(ids, user.id);
    const skills = await this.skillService.getFollowedBy(user.id);
    return skills.map((skill) => this.skillMapper.toSkillResponse(skill));
  }

  @ApiEndpoint({
    summary: 'Unfollow course categories',
    documentation: SkillDocumentation.UNFOLLOW,
    policies: SkillPolicies.UNFOLLOW,
  })
  @Post('/unfollow')
  async unfollowSkills(
    @Body('ids', SkillByIdPipe) ids: string[],
    @Body() body: DetachEntitiesDto,
    @User() user: DbUser,
  ) {
    await this.skillService.removeFolower(ids, user.id);
    const skills = await this.skillService.getFollowedBy(user.id);
    return skills.map((skill) => this.skillMapper.toSkillResponse(skill));
  }
}
