import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CriteriaController } from './controllers/criteria.controller';
import { CyclesController } from './controllers/cycles.controller';
import { DescriptionsController } from './controllers/descriptions.controller';
import { ProgramController } from './controllers/programs.controller';
import { CriteriaRepository } from './repositories/criteria.repository';
import { CyclesRepository } from './repositories/cycles.repository';
import { DescriptionRepository } from './repositories/descriptions.repository';
import { ProgramRepository } from './repositories/programs.repository';
import { CriteriaServices } from './services/criteria.service';
import { CyclesService } from './services/cycles.service';
import { DescriptionsServices } from './services/descriptions.service';
import { ProgramServices } from './services/programs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ProgramController,
    CyclesController,
    CriteriaController,
    DescriptionsController,
  ],
  providers: [
    ProgramServices,
    ProgramRepository,
    CyclesService,
    CyclesRepository,
    DescriptionsServices,
    DescriptionRepository,
    CriteriaServices,
    CriteriaRepository,
  ],
})
export class ProgramsModule {}
