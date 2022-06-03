import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { Country } from './entities/country';
import { GetCountryResponse } from './dto/getCountryResponse';
import { InsertCountryRequest } from './dto/insertCountryRequest';
import { UpdateCountryRequest } from './dto/updateCountryRequest';
import { WebinarRepository } from 'src/webinars/webinars.repository';

@Injectable()
export class CountriesService {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly webinarRepository: WebinarRepository,
  ) {}

  async findAll(): Promise<GetCountryResponse[]> {
    const countries = await this.countryRepository.findAll();
    return countries.map((country) => <GetCountryResponse>country);
  }

  async findOne(id: number): Promise<GetCountryResponse> {
    const country = await this.countryRepository.findOne(id);
    if (!country) {
      throw new HttpException('Country not Found', HttpStatus.NOT_FOUND);
    }
    return <GetCountryResponse>country;
  }

  async insertCountry(info: InsertCountryRequest): Promise<boolean> {
    const insertResponse = await this.countryRepository.insertCountry(
      <Object>info.name,
    );
    return insertResponse;
  }

  async updateCountry(info: UpdateCountryRequest): Promise<boolean> {
    const updateResponse = await this.countryRepository.updateCountry(
      <Country>info,
    );
    if (!updateResponse) {
      throw new HttpException('Country not Found', HttpStatus.NOT_FOUND);
    }
    return <boolean>updateResponse;
  }

  async deleteCountry(id: number): Promise<boolean> {
    const countryWebinar = await this.webinarRepository.getCountryWebinar(
      <number>id,
    );
    if (countryWebinar) {
      throw new HttpException(
        'Country is linked to a webinar',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleteResponse = await this.countryRepository.deleteCountry(
      <number>id,
    );
    if (!deleteResponse) {
      throw new HttpException('Country not Found', HttpStatus.NOT_FOUND);
    }
    return <boolean>deleteResponse;
  }
}
