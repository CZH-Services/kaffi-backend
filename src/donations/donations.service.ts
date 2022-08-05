import { Injectable } from '@nestjs/common';
import { DonationRepository } from './donations.repository';
import { DonationResponse } from './dto/donationResponse';
import { UpdateDonation } from './dto/updateDonation';
import { Donation } from './entities/donation';

@Injectable()
export class DonationsService {
  constructor(private readonly donationRepository: DonationRepository) {}

  async getDonationInformation(): Promise<DonationResponse> {
    const donationInformation =
      await this.donationRepository.getDonationInformation();
    return <DonationResponse>donationInformation;
  }

  async updateDonationInformation(donation: UpdateDonation): Promise<boolean> {
    return this.donationRepository.updateDonationInformation(
      <Donation>donation,
    );
  }

  async getDonationAmount(): Promise<string> {
    return this.donationRepository.getDonationAmount();
  }
}
