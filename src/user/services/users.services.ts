import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateUser } from '../dto/createUser';
import { ProfileInfoResponse } from '../dto/profileInfoResponse';
import { UpdateUserInfoRequest } from '../dto/updateUserInfoRequest';
import { UserResponse } from '../dto/userResponse';
import { UserRepository } from '../repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { hashString } from 'src/services/HashString';
import { CreateNonStaff } from '../dto/createNonStaff';

@Injectable()
export class UsersServices {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<UserResponse> {
    return this.userRepository.findOne(email);
  }

  async findOneById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }
    return <UserResponse>user;
  }

  async getUserProfileInfo(email: string): Promise<ProfileInfoResponse> {
    return await this.userRepository.getUserProfileInfo(email);
  }

  async createUser(info: CreateUser): Promise<Boolean> {
    if (await this.findOne(info.email)) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.createUser(info);
  }

  async hashPassThenCreateUser(info: CreateNonStaff): Promise<Boolean> {
    const hashedPassword = await hashString(info.password);
    return await this.createUser({
      email: info.email,
      password: hashedPassword,
      firstName: info.firstName,
      lastName: info.lastName,
      profile: null,
      location: info.location,
      authWithGoogle: false,
    });
  }

  async createAndGetUser(info: CreateUser): Promise<UserResponse> {
    await this.createUser(info);
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

  async getNonStaffUsers(): Promise<UserResponse[]> {
    return <UserResponse[]>await this.userRepository.getNonStaffUsers();
  }

  async deleteUser(userId: number): Promise<boolean> {
    return await this.userRepository.deleteUser(userId);
  }
}
