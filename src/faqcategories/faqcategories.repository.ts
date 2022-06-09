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

  async createFaqCategory(FAQCategory: FAQCategory): Promise<void> {
    return this.database
      .query(
        `INSERT INTO faqcategory (name ,rank) 
        VALUES($1, $2)`,
        [FAQCategory.name, FAQCategory.rank],
      )
      .then(() => {});
  }

  async updateFaqCategory(FAQCategory: FAQCategory): Promise<boolean> {
    return this.database
      .query(
        `UPDATE faqcategory SET name = '${FAQCategory.name}', rank = '${FAQCategory.rank}'
        WHERE id = ${FAQCategory.id}`,
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteFaqCategory(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM faqcategory WHERE id = ${id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
