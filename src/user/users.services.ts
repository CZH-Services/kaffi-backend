import { Injectable, Scope } from '@nestjs/common';
import { CreateUser } from './dto/createUser';
import { ProfileInfoResponse } from './dto/profileInfoResponse';
import { UpdateUserInfoRequest } from './dto/updateUserInfoRequest';
import { UserResponse } from './dto/userResponse';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersServices {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<UserResponse> {
    return this.userRepository.findOne(email);
  }

  async getUserProfileInfo(email: string): Promise<ProfileInfoResponse> {
    return await this.userRepository.getUserProfileInfo(email);
  }

  async createAndGetUser(info: CreateUser): Promise<UserResponse> {
    await this.userRepository.createUser(info);
    return await this.findOne(info.email);
  }

  async updateUser(
    email: string,
    data: UpdateUserInfoRequest,
  ): Promise<Boolean> {
    return await this.userRepository.updateUser(email, data);
  }

  async updateProfileImage(email: string, profile: Object): Promise<Boolean> {
    return await this.userRepository.updateProfileImage(
      email,
      profile['profile'][0].filename,
    );
  }
}
