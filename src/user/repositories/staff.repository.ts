import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { GetStaffResponse } from '../dto/getStaffResponse';
import { UpdateStaffInfoByAdminRequest } from '../dto/updateStaffInfoByAdminRequest';

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

  async findOne(userId: number): Promise<GetStaffResponse> {
    return this.database
      .query(`SELECT * FROM staff WHERE user_id = $1`, [userId])
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async getStaff(): Promise<GetStaffResponse[]> {
    return this.database
      .query(
        `SELECT u.id AS id, u.email AS email, u.firstName AS "firstName", 
         u.lastName AS "lastName", u.authWithGoogle AS "authWithGoogle" ,
         u.profileUrl AS profile, u.location AS location, 
         s.title AS title, s.tag AS tag, s.rank AS rank, 
         s.id AS "staffId"
         FROM staff AS s
         INNER JOIN kaffiuser AS u ON s.user_id = u.id 
         ORDER BY s.rank`,
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

  async deleteStaffRow(userId: number): Promise<Boolean> {
    return await this.database
      .query(`DELETE FROM staff WHERE user_id=$1`, [userId])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateStaff(staff: UpdateStaffInfoByAdminRequest): Promise<Boolean> {
    await this.database.query(
      'UPDATE staff SET title = $1, tag = $2, rank = $3 WHERE user_id = $4',
      [staff.title, staff.tag, staff.rank, staff.id],
    );

    return await this.database
      .query(
        'UPDATE kaffiuser SET firstName = $2, lastName = $3, location = $4\
      WHERE id = $1',
        [staff.id, staff.firstName, staff.lastName, staff.location],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateStaffRank(
    minRank: number,
    maxRank: number,
    increment: boolean,
  ): Promise<void> {
    const operation = increment ? '+' : '-';

    if (minRank === -1 || maxRank === -1) {
      const [comparison, rank] =
        minRank === -1 ? ['<=', maxRank] : ['>=', minRank];

      return this.database.query(
        'UPDATE staff SET rank = rank ' +
          operation +
          ' 1 WHERE rank ' +
          comparison +
          ' $1',
        [rank],
      );
    }
    return await this.database.query(
      'UPDATE staff SET rank = rank ' +
        operation +
        ' 1 WHERE rank >= $1 AND rank <= $2',
      [minRank, maxRank],
    );
  }
}
