import { Module } from '@nestjs/common';
import { DonationsController } from './donations/donations.controller';
import { DonationsService } from './donations/donations.service';

@Module({
  imports: [],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class AppModule {}
