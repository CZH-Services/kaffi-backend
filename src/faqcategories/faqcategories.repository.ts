import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { FAQCategory } from './entities/faqcategory';

@Injectable()
export class FAQCategoryRepository {
  constructor(private readonly database: PostgresService) {}

  async getFaqCategories(): Promise<FAQCategory[]> {
    return this.database
      .query('SELECT * FROM faqcategory ORDER BY rank')
      .then((res) => {
        return res.rows.map((faqcategory: any) => <FAQCategory>faqcategory);
      });
  }

  async createFaqCategory(FAQCategory: FAQCategory): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO faqcategory (name ,rank) 
        VALUES($1, $2)`,
        [FAQCategory.name, FAQCategory.rank],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
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
      .query(`DELETE FROM faqcategory WHERE id = $1`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
