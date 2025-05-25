import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { SkillDocumentation } from '../../common/documentation/modules/skill';
import { QuerySkillsDto } from '../../common/dtos/query-skills.dto';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { DbSkill } from '../../database/entities/skill.entity';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { SkillMapper } from './mappers/skill.mapper';

@ApiTags('Skills')
@Controller({
  path: '/skills',
  version: '1',
})
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
    @Query('orderBy', OrderByPipe) orderBy: OrderByDto<DbSkill>,
  ) {
    const skills = await this.skillService.getAll(query, orderBy);
    return this.skillMapper.toPaginatedSkillsResponse(skills);
  }
}
