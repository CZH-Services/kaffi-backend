import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WebinarsController } from './webinars.controller';
import { WebinarRepository } from './webinars.repository';
import { WebinarService } from './webinars.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WebinarsController],
  providers: [WebinarService, WebinarRepository],
})
export class WebinarModule {}
