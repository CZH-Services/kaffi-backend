import { Module } from '@nestjs/common';
import { DonationRepository } from './donations.repository';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { PermissionModule } from 'src/permissions/permission.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [DonationsController],
  providers: [DonationsService, DonationRepository, JwtService],
  exports: [DonationsService],
})
export class DonationModule {}
