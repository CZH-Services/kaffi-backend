import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Country } from './entities/country';

@Injectable()
export class CountryRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll(): Promise<Country[]> {
    return this.database.query('SELECT * FROM countries').then((res) => {
      return res.rows.map((country: any) => <Country>country);
    });
  }
}
