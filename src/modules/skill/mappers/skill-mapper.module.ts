import { Module } from '@nestjs/common';
import { SkillMapper } from './skill.mapper';

@Module({
  providers: [SkillMapper],
  exports: [SkillMapper],
})
export class SkillMapperModule {}
