import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';
import { UserModule } from './user/users.module';
import { CountryModule } from './countries/countries.module';
import { WebinarModule } from './webinars/webinars.module';
import { RoleModule } from './roles/role.module';
import { CommitteeModule } from './committee/committee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
    CountryModule,
    WebinarModule,
    UserModule,
    AuthModule,
    RoleModule,
    CommitteeModule,
    DonationModule,
  ],
})
export class AppModule {}
