import { Injectable } from '@nestjs/common';
import { Donation } from './models/donation';
import { DonationResponse } from './dto/donationResponse';
import { CreateDonation } from './dto/createDonation';

@Injectable()
export class DonationsService {
  private readonly donations: Donation[] = [
    { id: 1, name: 'Hussein Khamis', amount: 10 },
    { id: 2, name: 'Charbel Soufia', amount: 100 },
    { id: 3, name: 'Zeinab Zeitoun', amount: 10 },
  ];
  private lastIndex: number = 4;

  findAll(): DonationResponse[] {
    return this.donations.map(
      (donation: Donation) => <DonationResponse>donation,
    );
  }

  findOne(id: number): DonationResponse {
    const donation = this.donations.find((donation) => donation.id === id);
    if (!donation) {
      throw Error('Donation not found');
    }
    return <DonationResponse>donation;
  }

  create(donation: CreateDonation): DonationResponse {
    const newDonation = <Donation>donation;
    newDonation.id = this.lastIndex;
    this.lastIndex += 1;
    this.donations.push(newDonation);
    return <DonationResponse>donation;
  }
}
