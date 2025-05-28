import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { UserDocumentation } from '../../common/documentation/modules/user';
import { User } from '../../common/decorators/user.decorator';
import { DbUser } from '../../database/entities/user.entity';
import { UpdateUserDto } from '../../common/dtos/update-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { JwtGuard } from '../../common/guards/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FILE_PROCESSED_EVENT } from '../upload/events/file-processed.event';
import { FileProcessedEvent } from '../../common/events/file-processed.event';
import { AvatarValidationPipe } from '../../common/pipes/avatar-validation.pipe';
import { QueryUserCoursesDto } from '../../common/dtos/query-user-courses.dto';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { OrderByDto } from '../../common/dtos/order-by.dto';
import { DbCourse } from '../../database/entities/course.entity';
import { CourseCategoryMapper } from '../course-category/mappers/course-category.mapper';
import { SkillMapper } from '../skill/mappers/skill.mapper';

@ApiTags('Users')
@Controller({
  path: '/users',
  version: '1',
})
export class UserController {
  constructor(
    private userService: UserService,
    private userMapper: UserMapper,
    private categoryMapper: CourseCategoryMapper,
    private skillMapper: SkillMapper,
    private eventEmitter: EventEmitter2,
  ) {}

  @ApiEndpoint({
    summary: 'Update user info',
    documentation: UserDocumentation.UPDATE_ME,
    guards: JwtGuard,
  })
  @Patch('/me')
  async updateMe(@User() user: DbUser, @Body() dto: UpdateUserDto) {
    const updated = await this.userService.updateById(user.id, dto);
    return this.userMapper.toUserResponse(updated);
  }

  @ApiEndpoint({
    summary: 'Update user avatar',
    documentation: UserDocumentation.UPDATE_AVATAR,
    guards: JwtGuard,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('/me/avatar')
  async updateAvatar(
    @User() user: DbUser,
    @UploadedFile(AvatarValidationPipe) avatar: Express.Multer.File,
  ) {
    try {
      const updated = await this.userService.updateAvatar(user.id, avatar);
      return this.userMapper.toUserResponse(updated);
    } finally {
      this.eventEmitter.emit(
        FILE_PROCESSED_EVENT,
        new FileProcessedEvent(avatar.path),
      );
    }
  }

  @ApiEndpoint({
    summary: 'Get user courses',
    documentation: UserDocumentation.GET_COURSES,
    guards: JwtGuard,
  })
  @Get('/me/courses')
  async getCourses(
    @User() user: DbUser,
    @Query('orderBy', new OrderByPipe(DbCourse)) orderBy: OrderByDto,
    @Query() query: QueryUserCoursesDto,
  ) {
    const paginatedCourses = await this.userService.getAllUserCourses(
      user,
      query,
      orderBy,
    );
    return this.userService.getCoursesProgress(user.id, paginatedCourses);
  }

  @ApiEndpoint({
    summary: 'Get user categories followed by user',
    documentation: UserDocumentation.GET_CATEGORIES,
    guards: JwtGuard,
  })
  @Get('/me/courseCategories')
  async getCourseCategories(@User() user: DbUser) {
    const categories = await this.userService.getCourseCategories(user);
    return categories.map((category) =>
      this.categoryMapper.toBaseCourseCategoryResponse(category),
    );
  }

  @ApiEndpoint({
    summary: 'Get skills followed by user',
    documentation: UserDocumentation.GET_SKILLS,
    guards: JwtGuard,
  })
  @Get('/me/skills')
  async getSkills(@User() user: DbUser) {
    const skills = await this.userService.getSkills(user);
    return skills.map((skill) => this.skillMapper.toSkillResponse(skill));
  }
}
