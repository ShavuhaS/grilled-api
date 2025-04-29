import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapperModule } from './mappers/user-mapper.module';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule, UserMapperModule],
})
export class UserModule {}
