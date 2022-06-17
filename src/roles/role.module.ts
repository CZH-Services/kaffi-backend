import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { RolesServices } from './roles.service';

@Module({
  imports: [PostgresModule],
  controllers: [RolesController],
  providers: [RolesRepository, RolesServices],
})
export class RoleModule {}
