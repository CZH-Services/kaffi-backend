import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FAQCategory } from './entities/faqcategory';

@Injectable()
export class FAQCategoryRepository {
  constructor(private readonly database: DatabaseService) {}

  async getFaqCategories(): Promise<FAQCategory[]> {
    return this.database.query('SELECT * FROM faqcategory').then((res) => {
      return res.rows.map((faqcategory: any) => <FAQCategory>faqcategory);
    });
  }
}
