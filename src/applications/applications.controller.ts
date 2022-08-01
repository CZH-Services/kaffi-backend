import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
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

  @Put()
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
}
