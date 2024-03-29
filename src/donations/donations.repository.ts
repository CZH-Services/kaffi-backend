import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Donation } from './entities/donation';

@Injectable()
export class DonationRepository {
  constructor(private readonly database: PostgresService) {}

  async updateDonationInformation(donation: Donation): Promise<boolean> {
    return await this.database
      .query(
        'UPDATE Donation SET "accountName" = $1, iban = $2, swift = $3, "bankName" = $4, currency = $5, "externalPayments" = $6, amount = $7',
        [
          donation.accountName,
          donation.iban,
          donation.swift,
          donation.bankName,
          donation.currency,
          donation.externalPayments,
          donation.amount,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getDonationInformation(): Promise<Donation> {
    return await this.database
      .query('SELECT * FROM Donation limit 1;')
      .then((res) => {
        if (res.rowCount > 0) {
          return <Donation>res.rows[0];
        }
        return undefined;
      });
  }

  async seedDonation(donation: Donation): Promise<boolean> {
    if (await this.getDonationInformation()) return true;
    return this.database
      .query(
        'INSERT INTO Donation ("accountName", iban, swift, "bankName", currency, "externalPayments", amount) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          donation.accountName,
          donation.iban,
          donation.swift,
          donation.bankName,
          donation.currency,
          donation.externalPayments,
          donation.amount,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getDonationAmount(): Promise<string> {
    return await this.database
      .query('SELECT amount FROM Donation limit 1')
      .then((res) => {
        if (res.rowCount > 0) {
          return <string>res.rows[0].amount;
        }
        return undefined;
      });
  }
}
