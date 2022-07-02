import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { RolesController } from './roles.controller';
import { RolesServices } from './roles.service';

@Module({
  imports: [PostgresModule],
  controllers: [RolesController],
  providers: [RolesServices],
  exports: [RolesServices],
})
export class RoleModule {}
