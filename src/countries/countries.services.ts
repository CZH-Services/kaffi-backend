import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { Country } from './entities/country';
import { CountryResponse } from './dto/countryResponse';

@Injectable()
export class CountriesService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findAll(): Promise<CountryResponse[]> {
    const donations = await this.countryRepository.findAll();
    return donations.map((donation) => <CountryResponse>donation);
  }
}
