import { EntityByIdPipe } from './entity-by-id.pipe';
import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../../database/repositories/skill.repository';

@Injectable()
export class SkillByIdPipe extends EntityByIdPipe {
  constructor(private skillRepository: SkillRepository) {
    super(skillRepository, 'Skill');
  }
}
