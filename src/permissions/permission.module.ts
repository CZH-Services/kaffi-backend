import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionServices } from './permission.services';

@Module({
  imports: [PostgresModule],
  controllers: [PermissionController],
  providers: [PermissionRepository, PermissionServices],
})
export class PermissionModule {}
