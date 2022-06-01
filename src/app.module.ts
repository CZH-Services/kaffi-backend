import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';
import { CountryModule } from './countries/countries.module';
import { WebinarModule } from './webinars/webinars.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
    CountryModule,
    WebinarModule,
  ],
})
export class AppModule {}
