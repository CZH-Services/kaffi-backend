import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { ProgramsModule } from 'src/programs/programs.module';
import { UserModule } from 'src/user/users.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationRepository } from './applications.repository';
import { ApplicationService } from './applications.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule, ProgramsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationService, ApplicationRepository, JwtService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
