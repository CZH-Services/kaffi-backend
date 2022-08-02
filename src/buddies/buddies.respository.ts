import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { CreateBuddiesRequest } from './dto/createBuddiesRequest';
import { GetBuddiesResponse } from './dto/getBuddiesResponse';

@Injectable()
export class BuddyRespository {
  constructor(private readonly database: PostgresService) {}

  async findAllBuddies(): Promise<GetBuddiesResponse[]> {
    return this.database
      .query(
        `SELECT b.id AS id, b."buddyId" AS "buddyId", b."studentId" AS "studentId",
         b."connectedBy" AS "connectedBy", b."connectedOn" AS "connectedOn",
         CONCAT(bu.firstName , ' ', bu.lastName) AS "buddyFullName", bu.email AS "buddyEmail",
         CONCAT(su.firstName , ' ', su.lastName) "studentFullName", su.email AS "studentEmail",
         CONCAT(cu.firstName , ' ', cu.lastName)  AS "connectedByFullName", cu.email AS "connectedByEmail"
         FROM buddyMatch AS b
         INNER JOIN kaffiuser AS bu ON b."buddyId" = bu.id
         INNER JOIN kaffiuser AS su ON b."studentId" = su.id
         INNER JOIN kaffiuser AS cu ON b."connectedBy" = cu.id
         ORDER BY b."connectedOn" DESC`,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async findUserBuddies(userId: number): Promise<GetBuddiesResponse[]> {
    return this.database
      .query(
        `SELECT b.id AS id, b."buddyId" AS "buddyId", b."studentId" AS "studentId",
         b."connectedBy" AS "connectedBy", b."connectedOn" AS "connectedOn",
         CONCAT(bu.firstName , ' ', bu.lastName) AS "buddyFullName", bu.email AS "buddyEmail",
         CONCAT(su.firstName , ' ', su.lastName) "studentFullName", su.email AS "studentEmail",
         CONCAT(cu.firstName , ' ', cu.lastName)  AS "connectedByFullName", cu.email AS "connectedByEmail"
         FROM buddyMatch AS b
         INNER JOIN kaffiuser AS bu ON b."buddyId" = bu.id
         INNER JOIN kaffiuser AS su ON b."studentId" = su.id
         INNER JOIN kaffiuser AS cu ON b."connectedBy" = cu.id
         WHERE b."studentId" = $1 or b."buddyId" = $1
         ORDER BY b."connectedOn" DESC`,
        [userId],
      )
      .then((res) => {
        return res.rows;
      });
  }

  async findOneBuddyConnection(
    studentId: number,
    buddyId: number,
  ): Promise<GetBuddiesResponse> {
    return this.database
      .query(
        `SELECT b.id AS id, b."buddyId" AS "buddyId", b."studentId" AS "studentId",
         b."connectedBy" AS "connectedBy", b."connectedOn" AS "connectedOn",
         CONCAT(bu.firstName , ' ', bu.lastName) AS "buddyFullName", bu.email AS "buddyEmail",
         CONCAT(su.firstName , ' ', su.lastName) "studentFullName", su.email AS "studentEmail",
         CONCAT(cu.firstName , ' ', cu.lastName)  AS "connectedByFullName", cu.email AS "connectedByEmail"
         FROM buddyMatch AS b
         INNER JOIN kaffiuser AS bu ON b."buddyId" = bu.id
         INNER JOIN kaffiuser AS su ON b."studentId" = su.id
         INNER JOIN kaffiuser AS cu ON b."connectedBy" = cu.id
         WHERE b."studentId" = $1 AND b."buddyId" = $2`,
        [studentId, buddyId],
      )
      .then((res) => {
        if (res.rows.length > 0) {
          return res.rows[0];
        } else return undefined;
      });
  }

  async createBuddiesConnection(data: {
    buddyId: number;
    studentId: number;
    connectedBy: number;
  }): Promise<boolean> {
    return await this.database
      .query(
        'INSERT INTO buddyMatch ("buddyId", "studentId", "connectedBy")\
        VALUES ($1, $2, $3)',
        [data.buddyId, data.studentId, data.connectedBy],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteBuddiesConnection(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM buddyMatch WHERE id = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
