import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
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
  @ApiOperation({ summary: 'Update Initial Values' })
  @ApiOkResponse({
    status: 200,
    description: 'Initial Values updated successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateInitialValues(
    @Body() body: UpdateInitialValues,
  ): Promise<Boolean> {
    return await this.initialValuesService.updateInitialValues(body);
  }
}
