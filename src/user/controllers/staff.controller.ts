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
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateStaff } from '../dto/createStaff';
import { StaffServices } from '../services/staff.services';
import { GetStaffResponse } from '../dto/getStaffResponse';
import { UpdateStaffInfoByAdminRequest } from '../dto/updateStaffInfoByAdminRequest';
import { AddStaffInfo } from '../dto/addStaffInfo';

@ApiTags('Staff')
@Controller('staff')
export class StaffControllers {
  constructor(private readonly staffServices: StaffServices) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'create a staff user' })
  @ApiResponse({ status: 200, description: 'Success' })
  async createStaff(
    @Req() req: any,
    @Body() info: CreateStaff,
  ): Promise<Boolean> {
    return await this.staffServices.createStaffUser(info);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('add-staff-info')
  @ApiOperation({ summary: 'Add a staff info' })
  @ApiResponse({ status: 200, description: 'Success' })
  async addStaffInfo(
    @Req() req: any,
    @Body() info: AddStaffInfo,
  ): Promise<Boolean> {
    return await this.staffServices.addStaffInfo(info);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'get all staff users' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getStaff(@Req() req: any): Promise<GetStaffResponse[]> {
    return await this.staffServices.getStaffUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('tags')
  @ApiOperation({ summary: 'get staff tags' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getStaffTags(@Req() req: any): Promise<string[]> {
    return this.staffServices.getStaffTags();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'Update staff info' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updateSTaffInfo(
    @Req() req: any,
    @Body() body: UpdateStaffInfoByAdminRequest,
  ): Promise<Boolean> {
    return this.staffServices.updateStaff(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('remove-from-staff/:userId')
  @ApiOperation({ summary: 'removed from staff successfully' })
  @ApiResponse({ status: 200, description: 'Success' })
  async removeFromStaff(
    @Req() req: any,
    @Param('userId') userId: number,
  ): Promise<Boolean> {
    return this.staffServices.removeFromStaff(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':userId')
  @ApiOperation({ summary: 'staff deleted successfully' })
  @ApiResponse({ status: 200, description: 'Success' })
  async deleteStaff(
    @Req() req: any,
    @Param('userId') userId: number,
  ): Promise<Boolean> {
    return this.staffServices.deleteStaff(userId);
  }
}
