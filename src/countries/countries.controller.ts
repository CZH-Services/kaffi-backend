import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
import { CountryResponse } from './dto/countryResponse';

@ApiTags('countries')
@Controller('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get countries' })
  @ApiResponse({
    status: 200,
    description: 'Donations records',
    type: [CountryResponse],
  })
  async findAll(): Promise<CountryResponse[]> {
    return await this.countriesService.findAll();
  }
}
