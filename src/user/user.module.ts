import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersServices } from './users.services';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersServices, UserRepository],
})
export class UserModule {}
