import { Injectable, UseGuards } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Country } from './entities/country';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class CountryRepository {
  constructor(private readonly database: PostgresService) {}

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

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  async insertCountry(name: Object): Promise<boolean> {
    return this.database
      .query(`INSERT INTO countries (name) VALUES($1)`, [name])
      .then(() => {
        return true;
      });
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
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

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  async deleteCountry(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM countries WHERE id = $1`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
