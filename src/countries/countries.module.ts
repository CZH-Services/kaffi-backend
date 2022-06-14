import { Module } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.services';
import { PostgresModule } from 'src/postgres/postgres.module';
import { WebinarRepository } from 'src/webinars/webinars.repository';

@Module({
  imports: [PostgresModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository, WebinarRepository],
})
export class CountryModule {}
