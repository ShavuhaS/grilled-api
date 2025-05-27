import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapperModule } from './mappers/user-mapper.module';
import { PrismaModule } from '../../database/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { CourseModule } from '../course/course.module';
import { CourseMapperModule } from '../course/mappers/course-mapper.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    PrismaModule,
    StorageModule,
    forwardRef(() => CourseModule),
    CourseMapperModule,
    UserMapperModule,
  ],
})
export class UserModule {}
