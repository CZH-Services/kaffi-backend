import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from '../dto/createUser';
import { ProfileInfoResponse } from '../dto/profileInfoResponse';
import { UpdateUserInfoRequest } from '../dto/updateUserInfoRequest';
import { UserResponse } from '../dto/userResponse';
import { UserRepository } from '../repositories/users.repository';
import { hashString } from 'src/services/HashString';
import { CreateNonStaff } from '../dto/createNonStaff';
import { MailService } from 'src/services/MailService';

@Injectable()
export class UsersServices {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
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
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashString(generatedPassword);

    return await this.createUser({
      email: info.email,
      password: hashedPassword,
      firstName: info.firstName,
      lastName: info.lastName,
      profile: null,
      location: info.location,
      authWithGoogle: false,
    }).then(() => {
      this.mailService.sendWelcomeOnBoardMail(
        info.firstName,
        info.lastName,
        info.email,
        generatedPassword,
      );
      return true;
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

  async getNonStaffWithSpecificRole(role: string): Promise<UserResponse[]> {
    return <UserResponse[]>(
      await this.userRepository.getNonStaffWithSpecificRole(role)
    );
  }

  async getNonStaffWithNoRole(): Promise<UserResponse[]> {
    return <UserResponse[]>await this.userRepository.getNonStaffWithNoRole();
  }

  async deleteUser(userId: number): Promise<boolean> {
    return await this.userRepository.deleteUser(userId);
  }

  async changePassword(email: string, newPassword): Promise<boolean> {
    const hashedPassword = await hashString(newPassword);
    return await this.userRepository.changePassword(email, hashedPassword);
  }

  async getEmailsGivenSpecificRoleAndIds(
    role: string,
    committee: string | null,
  ): Promise<{ id: number; email: string }[]> {
    return await this.userRepository.getEmailsGivenSpecificRoleAndIds(
      role,
      committee,
    );
  }

  async updateResetPasswordToken(
    email: string,
    token: string,
  ): Promise<boolean> {
    return await this.userRepository.updateResetPasswordToken(email, token);
  }

  async getUserResetPasswordToken(email: string): Promise<string> {
    return await this.userRepository.getUserResetPasswordToken(email);
  }
}
