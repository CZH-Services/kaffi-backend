import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { CommitteesController } from './committee.controller';
import { CommitteesRepository } from './committees.repository';
import { CommittesServices } from './committees.service';

@Module({
  imports: [PostgresModule],
  controllers: [CommitteesController],
  providers: [CommitteesRepository, CommittesServices],
})
export class CommitteeModule {}
