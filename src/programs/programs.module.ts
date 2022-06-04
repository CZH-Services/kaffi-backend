import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProgramCriteriaController } from './controllers/criteria.controller';
import { ProgramDescriptionsController } from './controllers/descriptions.controller';
import { ProgramController } from './controllers/programs.controller';
import { CriteriaRepository } from './repositories/criteria.repository';
import { DescriptionRepository } from './repositories/descriptions.repository';
import { ProgramRepository } from './repositories/programs.repository';
import { CriteriaServices } from './services/criteria.service';
import { DescriptionsServices } from './services/descriptions.service';
import { ProgramServices } from './services/programs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ProgramController,
    ProgramCriteriaController,
    ProgramDescriptionsController,
  ],
  providers: [
    ProgramServices,
    ProgramRepository,
    DescriptionsServices,
    DescriptionRepository,
    CriteriaServices,
    CriteriaRepository,
  ],
})
export class ProgramsModule {}
