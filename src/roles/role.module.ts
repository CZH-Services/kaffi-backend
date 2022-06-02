import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { RolesServices } from './roles.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesRepository, RolesServices],
})
export class RoleModule {}
