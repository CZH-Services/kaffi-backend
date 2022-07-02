import { Module } from '@nestjs/common';
import { CommitteesServices } from 'src/committee/committees.service';
import { PostgresModule } from 'src/postgres/postgres.module';
import { RolesServices } from 'src/roles/roles.service';
import { UsersServices } from 'src/user/users.services';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionServices } from './permission.services';

@Module({
  imports: [PostgresModule, CommitteesServices, RolesServices, UsersServices],
  controllers: [PermissionController],
  providers: [PermissionRepository, PermissionServices],
})
export class PermissionModule {}
