import { Module } from '@nestjs/common';
import { DonationRepository } from './donations.repository';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [DonationsController],
  providers: [DonationsService, DonationRepository],
})
export class DonationModule {}
