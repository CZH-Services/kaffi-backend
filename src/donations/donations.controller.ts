import { Body, Controller, Get, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { DonationResponse } from './dto/donationResponse';
import { UpdateDonation } from './dto/updateDonation';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  @ApiOperation({ summary: 'Return donation page information' })
  @ApiCreatedResponse({
    description: 'Donation information',
    type: DonationResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getDonationInformation(): Promise<DonationResponse> {
    return this.donationsService.getDonationInformation();
  }

  @Put()
  @ApiOperation({ summary: 'Update donation page information' })
  @ApiCreatedResponse({
    description: 'Donation information',
    type: DonationResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async updateDonationInformation(
    @Body() donation: UpdateDonation,
  ): Promise<boolean> {
    return this.donationsService.updateDonationInformation(donation);
  }
}
