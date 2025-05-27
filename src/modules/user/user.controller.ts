import {
  Body,
  Controller,
  Patch,
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

@ApiTags('Users')
@Controller({
  path: '/users',
  version: '1',
})
export class UserController {
  constructor(
    private userService: UserService,
    private userMapper: UserMapper,
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
}
