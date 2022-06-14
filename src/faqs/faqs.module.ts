import { Module } from '@nestjs/common';
import { FAQRepository } from './faqs.repository';
import { FAQController } from './faqs.controller';
import { FAQService } from './faqs.service';
import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [FAQController],
  providers: [FAQService, FAQRepository],
})
export class FAQModule {}
