import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { CriteriaController } from './controllers/criteria.controller';
import { CyclesController } from './controllers/cycles.controller';
import { DescriptionsController } from './controllers/descriptions.controller';
import { ProgramController } from './controllers/programs.controller';
import { ProgramCriteriaRepository } from './repositories/programCriteria.repository';
import { ProgramCyclesRepository } from './repositories/programCycles.repository';
import { ProgramDescriptionRepository } from './repositories/programDescriptions.repository';
import { ProgramRepository } from './repositories/programs.repository';
import { ProgramCriteriaServices } from './services/programCriteria.service';
import { ProgramCyclesService } from './services/programCycles.service';
import { ProgramDescriptionsServices } from './services/programDescriptions.service';
import { ProgramServices } from './services/programs.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [
    ProgramController,
    CyclesController,
    CriteriaController,
    DescriptionsController,
  ],
  providers: [
    JwtService,
    ProgramServices,
    ProgramRepository,
    ProgramCyclesService,
    ProgramCyclesRepository,
    ProgramDescriptionsServices,
    ProgramDescriptionRepository,
    ProgramCriteriaServices,
    ProgramCriteriaRepository,
  ],
  exports: [ProgramServices, ProgramCyclesService],
})
export class ProgramsModule {}
