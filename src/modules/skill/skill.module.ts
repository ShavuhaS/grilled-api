import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { PrismaModule } from '../../database/prisma.module';
import { SkillMapperModule } from './mappers/skill-mapper.module';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
  imports: [PrismaModule, SkillMapperModule],
})
export class SkillModule {}
