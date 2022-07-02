import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommitteeModule } from 'src/committee/committee.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { RoleModule } from 'src/roles/role.module';
import { UserModule } from 'src/user/users.module';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionServices } from './permission.services';

@Module({
  imports: [JwtModule, PostgresModule, CommitteeModule, RoleModule, UserModule],
  controllers: [PermissionController],
  providers: [PermissionRepository, PermissionServices],
})
export class PermissionModule {}
