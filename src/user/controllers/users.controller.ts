import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PROFILES_MEDIA_PATH } from 'src/constants';
import { FileStorageService } from 'src/services/FileStorageService';
import { ProfileInfoResponse } from '../dto/profileInfoResponse';
import { UpdateUserInfoRequest } from '../dto/updateUserInfoRequest';
import { UsersServices } from '../services/users.services';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserProfileImage } from '../dto/updateUserProfileImage';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { UserResponse } from '../dto/userResponse';
import { UpdateProfileImageByAdmin } from '../dto/updateProfileImageByAdmin';
import { CreateNonStaff } from '../dto/createNonStaff';
import { UpdateUserInfoRequestByAdmin } from '../dto/updateUserInfoByAdminRequest';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersServices) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get user profile info' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getUserProfileInfo(@Req() req: any): Promise<ProfileInfoResponse> {
    return await this.userServices.getUserProfileInfo(<string>req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'Update user profile info' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updateUser(
    @Req() req: any,
    @Body() info: UpdateUserInfoRequest,
  ): Promise<Boolean> {
    return await this.userServices.updateUser(req.user.email, info);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/profile-image')
  @ApiOperation({ summary: 'update profile image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'profile', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(PROFILES_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'profile image updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateProfileImage(
    @Req() req: any,
    @Body() info: UpdateUserProfileImage,
    @UploadedFiles()
    profile: {
      profile?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.userServices.updateProfileImage(req.user.email, profile);
  }

  @Get('profileImage/:profile')
  @ApiOperation({ summary: 'Returns profile image' })
  @ApiResponse({
    status: 200,
    description: 'The profile image has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'profile image not found.',
  })
  async getProfileImage(
    @Param('profile') profile: string,
    @Res() res,
  ): Promise<any> {
    res.sendFile(profile, { root: PROFILES_MEDIA_PATH });
  }

  @Get('admin/non-staff')
  @ApiOperation({ summary: 'Returns nonstaff users list' })
  @ApiResponse({
    status: 200,
    description: 'non staff users has been successfully returned.',
    type: [UserResponse],
  })
  async getUsers(): Promise<UserResponse[]> {
    return await this.userServices.getNonStaffUsers();
  }

  @Get('admin/non-staff/:role')
  @ApiOperation({ summary: 'Returns nonstaff users list' })
  @ApiResponse({
    status: 200,
    description:
      'non staff users with specific role has been successfully returned.',
    type: [UserResponse],
  })
  async getUsersWithSpecificRole(
    @Param('role') role: string,
  ): Promise<UserResponse[]> {
    return await this.userServices.getNonStaffWithSpecificRole(role);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('admin/non-staff')
  @ApiOperation({ summary: 'create user by admin' })
  @ApiResponse({ status: 200, description: 'Success' })
  async createNonStaffByAdmin(
    @Req() req: any,
    @Body() info: CreateNonStaff,
  ): Promise<Boolean> {
    return await this.userServices.hashPassThenCreateUser(info);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('admin/non-staff')
  @ApiOperation({ summary: 'Update non staff user by admin' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updateNonStaffByAdmin(
    @Req() req: any,
    @Body() info: UpdateUserInfoRequestByAdmin,
  ): Promise<Boolean> {
    return await this.userServices.updateUser(info.email, info);
  }

  @Delete('admin/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully deleted a user',
    type: Boolean,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async deleteUser(@Param('id') userId: number) {
    return await this.userServices.deleteUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/admin/profile-image')
  @ApiOperation({ summary: 'update profile image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'profile', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(PROFILES_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'profile image updated by admin',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateProfileImageByAdmin(
    @Req() req: any,
    @Body() info: UpdateProfileImageByAdmin,
    @UploadedFiles()
    profile: {
      profile?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.userServices.updateProfileImage(info.email, profile);
  }
}
