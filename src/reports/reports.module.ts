import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './reports.repository';
import { ReportsServices } from './reports.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [ReportsController],
  providers: [ReportsServices, ReportsRepository, JwtService],
})
export class ReportsModule {}
