import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { DonationResponse } from './dto/donationResponse';
import { UpdateDonation } from './dto/updateDonation';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';

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

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
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
