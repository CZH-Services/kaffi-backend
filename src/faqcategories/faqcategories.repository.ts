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

  async getFaqCategory(id: number): Promise<FAQCategory> {
    return this.database
      .query('SELECT * FROM faqcategory where id = ' + id)
      .then((res) => {
        if (res.rowCount > 0) {
          return <FAQCategory>res.rows[0];
        }
        return undefined;
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

  async updateFAQCategoryRanks(
    minRank: Number,
    maxRank: Number,
    increment: boolean,
  ) {
    return this.database.query(
      `UPDATE faqcategory SET rank = rank ${
        increment ? '+' : '-'
      } 1 WHERE rank >= $1 AND rank <= $2;`,
      [minRank, maxRank],
    );
  }

  async updateFaqCategory(FAQCategory: FAQCategory): Promise<boolean> {
    return this.database

      .query(`UPDATE faqcategory SET rank = $1, name = $2 WHERE id = $3;`, [
        FAQCategory.rank,
        FAQCategory.name,
        FAQCategory.id,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async decreaseFaqRanks(rank: number) {
    return this.database.query(
      `UPDATE faq SET rank = rank - 1 WHERE rank >= $1;`,
      [rank],
    );
  }

  async decreaseFaqCategoryRanks(rank: number) {
    return this.database.query(
      `UPDATE faqcategory SET rank = rank - 1 WHERE rank >= $1;`,
      [rank],
    );
  }

  async deleteFaqCategory(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM faqcategory WHERE id = $1`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getHighestFAQTagRank(): Promise<number> {
    return this.database
      .query(`SELECT MAX(rank) FROM faqcategory ;`)
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0].max;
        }
        return undefined;
      });
  }
}
