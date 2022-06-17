import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/postgres/postgres.module';
import { FAQCategoryController } from './faqcategories.controller';
import { FAQCategoryRepository } from './faqcategories.repository';
import { FAQCategoryService } from './faqcategories.service';

@Module({
  imports: [PostgresModule],
  controllers: [FAQCategoryController],
  providers: [FAQCategoryService, FAQCategoryRepository],
})
export class FAQCategoryModule {}
