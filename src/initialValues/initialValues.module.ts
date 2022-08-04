import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { InitialValuesController } from './initialValues.controller';
import { InitialValuesRespository } from './initialValues.repository';
import { InitialValuesService } from './initialValues.service';
@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [InitialValuesController],
  providers: [InitialValuesService, InitialValuesRespository, JwtService],
})
export class InitialValuesModule {}
