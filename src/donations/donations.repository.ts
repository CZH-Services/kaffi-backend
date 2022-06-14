import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Donation } from './entities/donation';

@Injectable()
export class DonationRepository {
  constructor(private readonly database: PostgresService) {}

  async insertDonation(donation: Donation): Promise<void> {
    this.database
      .query(
        `INSERT INTO Donation(name, amount) VALUES('${donation.name}', '${donation.amount}')`,
      )
      .then(() => {});
  }

  async findAll(): Promise<Donation[]> {
    return this.database.query('SELECT * FROM Donation').then((res) => {
      return res.rows.map((donation: any) => <Donation>donation);
    });
  }

  async findOne(id: number): Promise<Donation> {
    return await this.database
      .query('SELECT * FROM Donation WHERE id = $1', [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Donation>res.rows[0];
        }
        return undefined;
      });
  }
}
