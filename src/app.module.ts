import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';

@Module({
  imports: [ConfigModule.forRoot(), DonationModule],
})
export class AppModule {}
