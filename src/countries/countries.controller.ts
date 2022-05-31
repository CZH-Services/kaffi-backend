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
import { CountriesService } from './countries.services';
import { deleteCountryRequest } from './dto/deleteCountryRequest';
import { GetCountryRequest } from './dto/getCountryRequest';
import { GetCountryResponse } from './dto/getCountryResponse';
import { InsertCountryRequest } from './dto/insertCountryRequest';
import { UpdateCountryRequest } from './dto/updateCountryRequest';

@ApiTags('countries')
@Controller('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get countries' })
  @ApiResponse({
    status: 200,
    description: 'Donations records',
    type: [GetCountryResponse],
  })
  async findAll(): Promise<GetCountryResponse[]> {
    return await this.countriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'country',
    type: GetCountryResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findOne(@Param() info: GetCountryRequest): Promise<GetCountryResponse> {
    return await this.countriesService.findOne(<number>info.id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new country' })
  @ApiOkResponse({
    status: 200,
    description: 'country added',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createCountry(@Body() info: InsertCountryRequest): Promise<boolean> {
    return await this.countriesService.insertCountry(
      <InsertCountryRequest>info,
    );
  }

  @Put()
  @ApiOperation({ summary: 'update an existing country' })
  @ApiOkResponse({
    status: 200,
    description: 'country updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateCountry(@Body() info: UpdateCountryRequest): Promise<boolean> {
    return await this.countriesService.updateCountry(
      <UpdateCountryRequest>info,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a country' })
  @ApiOkResponse({
    status: 200,
    description: 'country deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteCountry(@Param() info: deleteCountryRequest): Promise<boolean> {
    return await this.countriesService.deleteCountry(info.id);
  }
}
