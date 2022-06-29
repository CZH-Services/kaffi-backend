import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserRoleController } from './userRole.controller';
import { UserRoleRepository } from './userRole.repository';
import { UserRoleServices } from './userRole.service';

@Module({
  imports: [PostgresModule],
  controllers: [UserRoleController],
  providers: [UserRoleRepository, UserRoleServices],
})
export class UserRoleModule {}
