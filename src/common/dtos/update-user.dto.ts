import { PartialType, PickType } from '@nestjs/swagger';
import { RegistrationDto } from './registration.dto';

export class UpdateUserDto extends PartialType(
  PickType(RegistrationDto, ['name', 'surname']),
) {}
