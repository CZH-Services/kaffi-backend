import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FAQCategoryController } from './faqcategories.controller';
import { FAQCategoryRepository } from './faqcategories.repository';
import { FAQCategoryService } from './faqcategories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FAQCategoryController],
  providers: [FAQCategoryService, FAQCategoryRepository],
})
export class FAQCategoryModule {}
