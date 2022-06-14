import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { WebinarsController } from './webinars.controller';
import { WebinarRepository } from './webinars.repository';
import { WebinarService } from './webinars.service';

@Module({
  imports: [PostgresModule],
  controllers: [WebinarsController],
  providers: [WebinarService, WebinarRepository],
})
export class WebinarModule {}
