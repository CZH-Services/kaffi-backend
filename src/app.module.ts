import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';
import { FAQModule } from './faqs/faqs.module';
import { FAQCategoryModule } from './faqcategories/faqcategories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
    FAQModule,
    FAQCategoryModule,
  ],
})
export class AppModule {}
