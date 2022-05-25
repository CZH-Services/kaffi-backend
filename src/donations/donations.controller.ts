import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonation } from './dto/createDonation';
import { DonationResponse } from './dto/donationResponse';

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
  @ApiQuery({ name: 'id' })
  @ApiOperation({ summary: 'Get a donation by ID' })
  @ApiOkResponse({ description: "A user's donation", type: DonationResponse })
  @ApiForbiddenResponse({ description: "You're not allowed in here." })
  async findOne(@Param('id') id: number): Promise<DonationResponse> {
    // one thing missing are the validators
    return await this.donationsService.findOne(id);
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
    // one thing missing are the validators
    await this.donationsService.insertDonation(donation);
  }
}
