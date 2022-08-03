import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationService } from './applications.service';
import { AddApplication } from './entities/AddApplication';
import { ApplicationResponse } from './entities/ApplicationResponse';
import { UpdateApplicationStatus } from './entities/UpdateApplicationStatus';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creates a user application' })
  @ApiResponse({
    status: 200,
    description: 'Application created',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async addApplication(
    @Body() newApplication: AddApplication,
  ): Promise<boolean> {
    return this.applicationService.addApplication(newApplication);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets applications' })
  @ApiResponse({
    status: 200,
    description: 'Applications returned',
    type: [ApplicationResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getApplications(): Promise<ApplicationResponse[]> {
    return await this.applicationService.getApplications();
  }

  @Put('applicationStatus')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates application status' })
  @ApiResponse({
    status: 200,
    description: 'Application status updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateApplicationStatus(
    @Body()
    updateApplicationStatus: UpdateApplicationStatus,
  ): Promise<boolean> {
    return await this.applicationService.updateApplicationStatus(
      updateApplicationStatus,
    );
  }

  @Put('scholarshipStatus')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates scholarship status' })
  @ApiResponse({
    status: 200,
    description: 'Scholarship status updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateScholarshipStatus(
    @Body()
    updateApplicationStatus: UpdateApplicationStatus,
  ): Promise<boolean> {
    return await this.applicationService.updateScholarshipStatus(
      updateApplicationStatus,
    );
  }
}