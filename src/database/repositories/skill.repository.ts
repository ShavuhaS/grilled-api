import { DbSkill } from '../entities/skill.entity';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';

@Injectable()
export class SkillRepository extends BaseRepository<'skill', DbSkill> {
  constructor(private prisma: PrismaService) {
    super(prisma.skill);
  }
}
