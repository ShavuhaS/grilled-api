import { PageDto } from './page.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';
import { getOrderByKv, getOrderByRegex } from '../utils/get-order-by-regex.util';
import { DbSkill } from '../../database/entities/skill.entity';

export class QuerySkillsDto extends PageDto {
  @ApiPropertyOptional({
    description: `Order by string in the format (comma-separated): ${getOrderByKv(DbSkill)}`,
  })
  @IsOptional()
  @Matches(getOrderByRegex(DbSkill), { message: 'Order by string is invalid' })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Search string',
  })
  @IsOptional()
  search?: string;
}