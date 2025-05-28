import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapperModule } from './mappers/user-mapper.module';
import { PrismaModule } from '../../database/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { CourseModule } from '../course/course.module';
import { CourseMapperModule } from '../course/mappers/course-mapper.module';
import { CourseCategoryModule } from '../course-category/course-category.module';
import { CourseCategoryMapperModule } from '../course-category/mappers/course-category-mapper.module';
import { SkillModule } from '../skill/skill.module';
import { SkillMapperModule } from '../skill/mappers/skill-mapper.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    PrismaModule,
    StorageModule,
    forwardRef(() => CourseModule),
    CourseCategoryModule,
    SkillModule,
    SkillMapperModule,
    CourseMapperModule,
    CourseCategoryMapperModule,
    UserMapperModule,
  ],
})
export class UserModule {}
