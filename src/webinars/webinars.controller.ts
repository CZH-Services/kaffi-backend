import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCountryResponse } from 'src/countries/dto/getCountryResponse';
import { UpdateCountryRequest } from 'src/countries/dto/updateCountryRequest';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { GetCountryWebinarRequest } from './dto/getCountryWebinarRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { WebinarService } from './webinars.service';

@ApiTags('webinars')
@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarService: WebinarService) {}

  @Get()
  @ApiOperation({ summary: 'Get webinars' })
  @ApiResponse({
    status: 200,
    description: 'Webinars records',
    type: [GetWebinarResponse],
  })
  async findAll(): Promise<GetWebinarResponse[]> {
    return await this.webinarService.findAll();
  }

  @Get(':countryId')
  @ApiOperation({ summary: 'Get country webinar' })
  @ApiResponse({
    status: 200,
    description: 'Country webinar record',
    type: GetWebinarResponse,
  })
  async getCountryWebinar(
    @Param() data: GetCountryWebinarRequest,
  ): Promise<GetWebinarResponse> {
    return await this.webinarService.getCountryWebinar(<number>data.countryId);
  }

  @Post()
  @ApiOperation({ summary: 'create a new webinar' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar added',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createWebinar(@Body() info: AddWebinarRequest): Promise<boolean> {
    return await this.webinarService.insertWebinar(<AddWebinarRequest>info);
  }

  @Put()
  @ApiOperation({ summary: 'create a new webinar' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar added',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateWebinar(@Body() info: UpdateWebinarRequest): Promise<boolean> {
    return await this.webinarService.updateWebinar(<UpdateWebinarRequest>info);
  }
}
