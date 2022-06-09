import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FAQ } from './entities/faq';

@Injectable()
export class FAQRepository {
  constructor(private readonly database: DatabaseService) {}

  async getFaqs(): Promise<FAQ[]> {
    return this.database.query('SELECT * FROM faq').then((res) => {
      return res.rows.map((faq: any) => <FAQ>faq);
    });
  }

  async getFaqsOfCategory(id: number): Promise<FAQ[]> {
    return this.database
      .query(
        'SELECT * FROM faq INNER JOIN faqcategory on faq.category_id = faqcategory.id',
      )
      .then((res) => {
        return res.rows.map((faq: any) => <FAQ>faq);
      });
  }

  async createFaq(faq: FAQ): Promise<void> {
    return this.database
      .query(
        `INSERT INTO faq (question , answer , rank, category_id) 
        VALUES($1, $2, $3 , $4)`,
        [faq.question, faq.answer, faq.rank, faq.category_id],
      )
      .then(() => {});
  }

  async updateFaq(faq: FAQ): Promise<boolean> {
    return this.database
      .query(
        `UPDATE faq SET question = '${faq.question}', answer = '${faq.answer}'
        ,rank = '${faq.rank}' ,category_id = '${faq.category_id}' WHERE id = ${faq.id}`,
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteFaq(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM faq WHERE id = ${id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
