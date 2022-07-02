import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersServices } from './users.services';

@Module({
  imports: [PostgresModule],
  controllers: [UsersController],
  providers: [UsersServices, UserRepository, JwtService],
  exports: [UsersServices],
})
export class UserModule {}
