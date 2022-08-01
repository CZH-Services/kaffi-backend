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
  async addApplication(
    @Body() newApplication: AddApplication,
  ): Promise<boolean> {
    return this.applicationService.addApplication(newApplication);
  }

  @Get()
  async getApplications(): Promise<ApplicationResponse[]> {
    return await this.applicationService.getApplications();
  }

  @Put()
  async updateApplicationStatus(
    @Body()
    updateApplicationStatus: UpdateApplicationStatus,
  ): Promise<boolean> {
    return await this.applicationService.updateApplicationStatus(
      updateApplicationStatus,
    );
  }
}
