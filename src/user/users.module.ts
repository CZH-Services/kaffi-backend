import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostgresModule } from 'src/postgres/postgres.module';
import { StaffControllers } from './controllers/staff.controller';
import { UsersController } from './controllers/users.controller';
import { StaffRepository } from './repositories/staff.repository';
import { UserRepository } from './repositories/users.repository';
import { StaffServices } from './services/staff.services';
import { UsersServices } from './services/users.services';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [PostgresModule],
  controllers: [UsersController, StaffControllers],
  providers: [
    UsersServices,
    StaffServices,
    StaffRepository,
    UserRepository,
    JwtService,
  ],
  exports: [UsersServices],
})
export class UserModule {}
