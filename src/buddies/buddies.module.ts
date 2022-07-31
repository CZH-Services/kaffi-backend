import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { BuddiesController } from './buddies.controller';
import { BuddyRespository } from './buddies.respository';
import { BuddyService } from './buddies.service';

@Module({
  imports: [PostgresModule, PermissionModule],
  controllers: [BuddiesController],
  providers: [BuddyService, BuddyRespository, JwtService],
})
export class BuddiesModule {}
