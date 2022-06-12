import { Module } from '@nestjs/common';
import { FAQRepository } from './faqs.repository';
import { FAQController } from './faqs.controller';
import { FAQService } from './faqs.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FAQController],
  providers: [FAQService, FAQRepository],
})
export class FAQModule {}
