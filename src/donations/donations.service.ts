import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DonationResponse } from './dto/donationResponse';
import { DonationRepository } from './donations.repository';
import { CreateDonation } from './dto/createDonation';
import { Donation } from './entities/donation';

@Injectable()
export class DonationsService {
  constructor(private readonly donationRepository: DonationRepository) {}

  async findAll(): Promise<DonationResponse[]> {
    const donations = await this.donationRepository.findAll();
    return donations.map((donation) => <DonationResponse>donation);
  }

  async findOne(id: number): Promise<DonationResponse> {
    const donation = await this.donationRepository.findOne(id);
    if (!donation) {
      // not sure if it works as we can't even fetch one..
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return <DonationResponse>donation;
  }

  async insertDonation(donation: CreateDonation): Promise<void> {
    await this.donationRepository.insertDonation(<Donation>donation);
  }
}
