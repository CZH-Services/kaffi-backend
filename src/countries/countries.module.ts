import { Module } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.services';
import { DatabaseModule } from 'src/database/database.module';
import { WebinarRepository } from 'src/webinars/webinars.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository, WebinarRepository],
})
export class CountryModule {}
