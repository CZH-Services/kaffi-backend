import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Donation } from './entities/donation';

@Injectable()
export class DonationRepository {
  constructor(private readonly database: DatabaseService) {}

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
    return this.database
      .query('SELECT * FROM Donation WHERE id = ' + id)
      .then((res) => {
        console.log(res);

        if (res.rows.length === 1) {
          return <Donation>res.rows[0];
        }
        return undefined;
      });
  }
}
