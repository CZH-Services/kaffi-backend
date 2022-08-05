import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/applications/applications.module';
import { DonationModule } from 'src/donations/donations.module';
import { InitialValuesModule } from 'src/initialValues/initialValues.module';
import { PermissionModule } from 'src/permissions/permission.module';
import { LandingController } from './Landing.controller';
import { LandingService } from './Landing.service';

@Module({
  imports: [
    ApplicationModule,
    DonationModule,
    PermissionModule,
    InitialValuesModule,
  ],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
