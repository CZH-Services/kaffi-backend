import { Module } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.services';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository],
})
export class CountryModule {}
