import { Module } from '@nestjs/common';
import { CountryRepository } from './countries.repository';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.services';
import { PostgresModule } from 'src/postgres/postgres.module';
import { WebinarRepository } from 'src/webinars/webinars.repository';
import { UserModule } from 'src/user/users.module';
import { PermissionModule } from 'src/permissions/permission.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    CountryRepository,
    WebinarRepository,
    JwtService,
  ],
})
export class CountryModule {}
