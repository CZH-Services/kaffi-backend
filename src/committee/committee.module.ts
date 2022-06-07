import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CommitteesController } from './committee.controller';
import { CommitteesRepository } from './committees.repository';
import { CommittesServices } from './committees.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CommitteesController],
  providers: [CommitteesRepository, CommittesServices],
})
export class CommitteeModule {}
