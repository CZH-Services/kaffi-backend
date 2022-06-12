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

  async findOne(id: number): Promise<Country> {
    return this.database
      .query('SELECT * FROM countries WHERE id = $1', [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Country>res.rows[0];
        }
        return undefined;
      });
  }

  async insertCountry(name: Object): Promise<boolean> {
    return this.database
      .query(`INSERT INTO countries (name) VALUES($1)`, [name])
      .then(() => {
        return true;
      });
  }

  async updateCountry(country: Country): Promise<boolean> {
    return this.database
      .query(`UPDATE countries SET name = $1 WHERE id = $2`, [
        country.name,
        country.id,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteCountry(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM countries WHERE id = $1`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
