import { Injectable, Scope } from '@nestjs/common';
import { CreateUser } from './dto/createUser';
import { UserResponse } from './dto/userResponse';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersServices {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<UserResponse> {
    return this.userRepository.findOne(email);
  }

  async createAndGetUser(info: CreateUser): Promise<UserResponse> {
    await this.userRepository.createUser(info);
    return await this.findOne(info.email);
  }
}
