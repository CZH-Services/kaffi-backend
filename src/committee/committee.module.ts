import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { CommitteesController } from './committee.controller';
import { CommitteesServices } from './committees.service';

@Module({
  imports: [PostgresModule],
  controllers: [CommitteesController],
  providers: [CommitteesServices],
  exports: [CommitteesServices],
})
export class CommitteeModule {}
