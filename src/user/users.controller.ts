import {
  Body,
  Controller,
  Get,
  Param,
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
import { ProfileInfoResponse } from './dto/profileInfoResponse';
import { UpdateUserInfoRequest } from './dto/updateUserInfoRequest';
import { UsersServices } from './users.services';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserProfileImage } from './dto/updateUserProfileImage';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { profile } from 'console';

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
  async getWebinarIcon(
    @Param('profile') profile: string,
    @Res() res,
  ): Promise<any> {
    res.sendFile(profile, { root: PROFILES_MEDIA_PATH });
  }
}
