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
    return await this.staffServices.getStaffTags();
  }
}
