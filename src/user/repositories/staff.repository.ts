import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { GetStaffResponse } from '../dto/getStaffResponse';

@Injectable()
export class StaffRepository {
  constructor(private readonly database: PostgresService) {}

  async createStaff(staff: {
    title: Object;
    tag: string;
    rank: number;
    userId: number;
  }): Promise<Boolean> {
    return await this.database
      .query(
        `INSERT INTO staff (title, tag, rank, user_id) VALUES ($1, $2, $3, $4)`,
        [staff.title, staff.tag, staff.rank, staff.userId],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getStaff(): Promise<GetStaffResponse[]> {
    return this.database
      .query(
        `SELECT u.id AS id, u.email AS email, u.firstName AS firstName, 
         u.lastName AS lastName, u.authWithGoogle AS authWithGoogle ,
         u.profileUrl AS profile, u.location AS location, 
         s.title AS title, s.tag AS tag, s.rank AS rank, 
         s.id AS "staffId"
         FROM staff AS s
         INNER JOIN kaffiuser AS u ON s.user_id = u.id `,
      )
      .then((res) => {
        if (res.rows) {
          return res.rows;
        }
        return undefined;
      });
  }

  async getHighestStaffRank(): Promise<number> {
    return this.database
      .query(`SELECT MAX(rank) AS rank FROM staff`)
      .then((res) => {
        if (res.rows) {
          return res.rows[0].rank;
        }
        return undefined;
      });
  }
}
