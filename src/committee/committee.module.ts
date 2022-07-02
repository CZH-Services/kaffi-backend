import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { CommitteesController } from './committee.controller';
import { CommitteesRepository } from './committees.repository';
import { CommitteesServices } from './committees.service';

@Module({
  imports: [PostgresModule],
  controllers: [CommitteesController],
  providers: [CommitteesRepository, CommitteesServices],
  exports: [CommitteesServices],
})
export class CommitteeModule {}
