import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStaff } from '../dto/createStaff';
import { StaffServices } from '../services/staff.services';
import { GetStaffResponse } from '../dto/getStaffResponse';
import { UpdateStaffInfoByAdminRequest } from '../dto/updateStaffInfoByAdminRequest';
import { AddStaffInfo } from '../dto/addStaffInfo';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { GetStaffByTagWithCommitteesHead } from '../dto/getStaffByTagWithCommitteesHead';

@ApiTags('Staff')
@Controller('staff')
export class StaffControllers {
  constructor(private readonly staffServices: StaffServices) {}

  @UseGuards(IsAdminGuard)
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

  @UseGuards(IsAdminGuard)
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

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'get all staff users' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [GetStaffResponse],
  })
  async getStaff(@Req() req: any): Promise<GetStaffResponse[]> {
    return await this.staffServices.getStaffUsers();
  }

  @Get('public/grouped-by-tag')
  @ApiOperation({ summary: 'get all staff users grouped by tag' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: GetStaffByTagWithCommitteesHead,
  })
  async getstaffGroupedByTagWithCommitteeHeads(): Promise<GetStaffByTagWithCommitteesHead> {
    return await this.staffServices.getstaffGroupedByTagWithCommitteeHeads();
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Get('tags')
  @ApiOperation({ summary: 'get staff tags' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getStaffTags(@Req() req: any): Promise<string[]> {
    return this.staffServices.getStaffTags();
  }

  @UseGuards(IsAdminGuard)
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

  @UseGuards(IsAdminGuard)
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

  @UseGuards(IsAdminGuard)
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
