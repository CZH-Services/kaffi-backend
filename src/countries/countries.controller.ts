import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
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
import { IsAdminGuard } from 'src/guards/isAdmin.guard';

@ApiTags('Countries')
@Controller('countries')
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
  async findOne(@Param() info: GetCountryRequest): Promise<GetCountryResponse> {
    return await this.countriesService.findOne(<number>info.id);
  }

  @Post()
  @UseGuards(IsAdminGuard)
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
  @UseGuards(IsAdminGuard)
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
  @UseGuards(IsAdminGuard)
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
