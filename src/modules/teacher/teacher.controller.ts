import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teachers')
@Controller({
  path: '/teachers',
  version: '1',
})
export class TeacherController {}
