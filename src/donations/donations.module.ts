import { Module } from '@nestjs/common';
import { DonationRepository } from './donations.repository';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DonationsController],
  providers: [DonationsService, DonationRepository],
})
export class DonationModule {}
