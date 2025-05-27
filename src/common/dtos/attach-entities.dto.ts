import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AttachEntitiesDto {
  @ApiProperty({
    description: 'Ids of the entities to connect',
  })
  @IsNotEmpty({ message: 'Ids must not be empty' })
  @IsArray({ message: 'Ids must be an array' })
  @IsUUID(undefined, { each: true, message: 'Each id must be a valid UUID' })
  ids: string[];
}
