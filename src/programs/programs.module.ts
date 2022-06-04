import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProgramController } from './programs.controller';
import { ProgramRepository } from './programs.repository';
import { ProgramServices } from './programs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgramController],
  providers: [ProgramServices, ProgramRepository],
})
export class ProgramsModule {}
