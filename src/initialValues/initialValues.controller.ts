import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BLOGS_MEDIA_PATH } from 'src/constants';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { FileStorageService } from 'src/services/FileStorageService';
import { GetInitialValues } from './dto/getInitialValues';
import { UpdateInitialValues } from './dto/updateInitialValues';
import { InitialValuesService } from './initialValues.service';

@ApiTags('InitialValues')
@Controller('initial-values')
export class InitialValuesController {
  constructor(private readonly initialValuesService: InitialValuesService) {}

  @Get()
  @ApiOperation({ summary: 'Get Initial Values' })
  @ApiResponse({
    status: 200,
    description: 'Initial Values records',
    type: GetInitialValues,
  })
  async findAll(): Promise<GetInitialValues> {
    return await this.initialValuesService.getInitialValues();
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'update Initial Values' })
  @ApiOkResponse({
    status: 200,
    description: 'Initial Values added successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateProfileImage(
    @Body() body: UpdateInitialValues,
  ): Promise<Boolean> {
    return await this.initialValuesService.updateInitialValues(body);
  }
}
