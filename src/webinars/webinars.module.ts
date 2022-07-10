import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { WebinarsController } from './webinars.controller';
import { WebinarRepository } from './webinars.repository';
import { WebinarService } from './webinars.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [WebinarsController],
  providers: [WebinarService, WebinarRepository, JwtService],
})
export class WebinarModule {}
