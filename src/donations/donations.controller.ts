import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonation } from './dto/createDonation';
import { DonationResponse } from './dto/donationResponse';
import { GetDonation } from './dto/getDonation';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get donations' })
  @ApiResponse({
    status: 200,
    description: 'Donations records',
    type: [DonationResponse],
  })
  async findAll(): Promise<DonationResponse[]> {
    return await this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a donation by ID' })
  @ApiOkResponse({ description: "A user's donation", type: DonationResponse })
  @ApiForbiddenResponse({ description: "You're not allowed in here." })
  async findOne(@Param() id: GetDonation): Promise<DonationResponse> {
    return await this.donationsService.findOne(id.id);
  }

  @Post()
  @ApiBody({ type: CreateDonation })
  @ApiOperation({ summary: 'Donate a specific amount under a specific name' })
  @ApiCreatedResponse({
    description: 'Donation was created!',
    type: DonationResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async donate(@Body() donation: CreateDonation): Promise<void> {
    await this.donationsService.insertDonation(donation);
  }
}
