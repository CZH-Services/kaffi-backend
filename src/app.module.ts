import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './roles/role.module';
import { CommitteeModule } from './committee/committee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
    UserModule,
    RoleModule,
    CommitteeModule,
  ],
})
export class AppModule {}
