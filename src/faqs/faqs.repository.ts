import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { FAQ } from './entities/faq';
import { faqsSwaggerConfiguration } from './faqs.swagger';

@Injectable()
export class FAQRepository {
  constructor(private readonly database: PostgresService) {}

  async getFaq(id: number): Promise<FAQ> {
    return this.database
      .query('SELECT * FROM faq where id = ' + id)
      .then((res) => {
        if (res.rowCount > 0) {
          return <FAQ>res.rows[0];
        }
        return undefined;
      });
  }

  async getFaqs(): Promise<FAQ[]> {
    return this.database
      .query(
        'SELECT f.id AS id, f.question AS question, f.answer AS answer, f.rank AS rank, f.category_id category_id,\
         fc.name AS name FROM faq AS f INNER JOIN faqcategory AS fc ON fc.id = f.category_id ORDER BY f.rank',
      )
      .then((res) => {
        return res.rows.map((faq: any) => <FAQ>faq);
      });
  }

  async getFaqsOfCategory(id: Number): Promise<FAQ[]> {
    return this.database
      .query(
        'SELECT * FROM faq INNER JOIN faqcategory ON faqcategory.id = faq.category_id where category_id = ' +
          id,
      )
      .then((res) => {
        return res.rows.map((faq: any) => <FAQ>faq);
      });
  }

  async createFaq(faq: FAQ): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO faq (question , answer , rank, category_id) 
        VALUES($1, $2, $3 , $4)`,
        [faq.question, faq.answer, faq.rank, faq.category_id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateFaq(faq: FAQ): Promise<boolean> {
    return this.database

      .query(
        `UPDATE faq SET question = $1, answer = $2 , rank = $3 , category_id = $4 WHERE id = $5;`,
        [faq.question, faq.answer, faq.rank, faq.category_id, faq.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async decreaseFaqRanks(categoryId: number, rank: number) {
    return this.database.query(
      `UPDATE faq SET rank = rank - 1 WHERE "category_id" = $1 AND rank >= $2;`,
      [categoryId, rank],
    );
  }

  async deleteFaq(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM faq WHERE id = ${id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getHighestFAQRank(categoryid: Number): Promise<number> {
    return this.database
      .query(`SELECT MAX(rank) FROM faq WHERE "category_id" = $1;`, [
        categoryid,
      ])
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0].max;
        }
        return undefined;
      });
  }

  async updateFAQRanks(
    categoryId: Number,
    minRank: Number,
    maxRank: Number,
    increment: boolean,
  ) {
    return this.database.query(
      `UPDATE faq SET rank = rank ${
        increment ? '+' : '-'
      } 1 WHERE "category_id" = $1 AND rank >= $2 AND rank <= $3;`,
      [categoryId, minRank, maxRank],
    );
  }
}
