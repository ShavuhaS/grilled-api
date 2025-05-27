import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { DbUser } from '../../database/entities/user.entity';
import { UpdateUserDto } from '../../common/dtos/update-user.dto';
import { InvalidEntityIdException } from '../../common/exceptions/invalid-entity-id.exception';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
  ) {}

  async getById(id: string): Promise<DbUser> {
    return this.userRepository.findById(id, {
      teacher: true,
    });
  }

  async updateById(id: string, dto: UpdateUserDto): Promise<DbUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    return this.userRepository.updateById(id, dto, { teacher: true });
  }

  async updateAvatar(id: string, avatar: Express.Multer.File): Promise<DbUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    const { storagePath } = await this.storageService.uploadAvatar(avatar);
    const updated = await this.userRepository.updateById(
      id,
      { avatar: storagePath },
      { teacher: true },
    );

    if (user.avatar) {
      await this.storageService.deleteFile(user.avatar);
    }

    updated.avatar = await this.storageService.getSignedUrl(updated.avatar);
    return updated;
  }
}
