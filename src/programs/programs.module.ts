import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProgramCriteriaController } from './controllers/criteria.controller';
import { ProgramCyclesController } from './controllers/cycles.controller';
import { ProgramDescriptionsController } from './controllers/descriptions.controller';
import { ProgramController } from './controllers/programs.controller';
import { DescriptionRepository } from './repositories/descriptions.repository';
import { ProgramRepository } from './repositories/programs.repository';
import { DescriptionsServices } from './services/descriptions.service';
import { ProgramServices } from './services/programs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ProgramController,
    ProgramCyclesController,
    ProgramCriteriaController,
    ProgramDescriptionsController,
  ],
  providers: [
    ProgramServices,
    ProgramRepository,
    DescriptionsServices,
    DescriptionRepository,
  ],
})
export class ProgramsModule {}
