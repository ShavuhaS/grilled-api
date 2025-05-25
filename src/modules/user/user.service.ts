import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { DbUser } from '../../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string): Promise<DbUser> {
    return this.userRepository.findById(id, {
      teacher: true,
    });
  }
}
