import { Module } from '@nestjs/common';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationRepository } from './applications.repository';
import { ApplicationService } from './applications.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [ApplicationsController],
  providers: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
