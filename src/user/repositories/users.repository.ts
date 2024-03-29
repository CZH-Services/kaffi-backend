import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { CreateUser } from '../dto/createUser';
import { ProfileInfoResponse } from '../dto/profileInfoResponse';
import { UpdateUserInfoRequest } from '../dto/updateUserInfoRequest';
import { UserResponse } from '../dto/userResponse';
import { User } from '../entities/user';
import { Role } from '../../roles/entities/role';
import { Committee } from 'src/committee/entities/committee';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PostgresService) {}

  async createUser(user: CreateUser): Promise<Boolean> {
    return await this.database
      .query(
        `INSERT INTO kaffiuser (firstname, lastname, email, password, authWithGoogle, profileUrl, location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.authWithGoogle,
          user.profile,
          user.location,
        ],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async findOne(email: string): Promise<UserResponse> {
    return this.database
      .query(
        `SELECT id, email, firstName AS "firstName", lastName AS "lastName", 
        location, profileUrl AS "profileUrl" , password, authWithGoogle AS "authWithGoogle"
        FROM kaffiuser WHERE email = $1`,
        [email],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async findOneById(id: number): Promise<UserResponse> {
    return this.database
      .query(`SELECT * FROM kaffiuser WHERE id = $1`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async getUserProfileInfo(email: string): Promise<ProfileInfoResponse> {
    return this.database
      .query(
        `SELECT id, email, firstName, lastName, location, profileUrl FROM kaffiuser WHERE email = $1`,
        [email],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async updateUser(
    email: string,
    data: UpdateUserInfoRequest,
  ): Promise<Boolean> {
    return this.database
      .query(
        `UPDATE kaffiuser SET firstName = $1, lastName = $2, location = $3 WHERE email = $4`,
        [data.firstName, data.lastName, data.location, email],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateProfileImage(email: string, profile: string): Promise<Boolean> {
    return this.database
      .query(`UPDATE kaffiuser SET profileUrl = $1 WHERE email = $2`, [
        profile,
        email,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getNonStaffWithSpecificRole(role: string): Promise<User[]> {
    return this.database
      .query(
        `SELECT distinct u.id AS id, u.firstName AS "firstName",
         u.lastName AS "lastName", u.location AS location,
         u.profileurl AS "profileUrl",  u.email AS email,
         u.authWithGoogle AS "authWithGoogle"
         FROM kaffiuser AS u 
         LEFT JOIN staff AS s on u.id = s.user_id
         INNER JOIN permission AS p on p."userId" = u.id
         WHERE p.role = '${role}' AND s.id IS NULL `,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async getScholarshipStudents(): Promise<User[]> {
    return this.database
      .query(
        `SELECT distinct u.id AS id, u.firstName AS "firstName",
        u.lastName AS "lastName", u.location AS location,
        u.profileurl AS "profileUrl",  u.email AS email,
        u.authWithGoogle AS "authWithGoogle"
        FROM kaffiuser AS u 
        LEFT JOIN staff AS s on u.id = s.user_id
        INNER JOIN permission AS p on p."userId" = u.id
        WHERE p.role = '${Role.STUDENT}' AND p.committee = '${Committee.SCHOLARSHIP}' AND s.id IS NULL `,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async getNonStaffWithNoRole(): Promise<User[]> {
    return this.database
      .query(
        `SELECT u.id AS id, u.firstName AS "firstName",
      u.lastName AS "lastName", u.location AS location,
      u.profileurl AS "profileUrl",  u.email AS email,
      u.authWithGoogle AS "authWithGoogle"
      FROM kaffiuser AS u 
      LEFT JOIN staff AS s on u.id = s.user_id
      LEFT JOIN permission AS p on p."userId" = u.id
      WHERE p.id IS NULL AND s.id IS NULL `,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async deleteUser(userId: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM kaffiuser WHERE id = $1`, [userId])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async changePassword(email: string, password: string): Promise<boolean> {
    return this.database
      .query(`UPDATE kaffiuser SET password = $1 WHERE email = $2`, [
        password,
        email,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getEmailsGivenSpecificRoleAndIds(
    role: string,
    committee: string | null,
  ): Promise<{ id: number; email: string }[]> {
    const committeeCheck = committee ? `p.committee  = '${committee}'` : `TRUE`;
    return this.database
      .query(
        `SELECT DISTINCT u.email AS email, u.id AS id
         FROM kaffiuser AS u 
         INNER JOIN permission AS p on p."userId" = u.id
         WHERE p.role =  '${role}' AND ${committeeCheck}`,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async updateResetPasswordToken(
    email: string,
    token: string,
  ): Promise<boolean> {
    return this.database
      .query(
        `UPDATE kaffiuser SET "resetPasswordToken" = $1 WHERE email = $2`,
        [token, email],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getUserResetPasswordToken(email: string): Promise<string> {
    return this.database
      .query(`SELECT "resetPasswordToken" FROM kaffiuser WHERE email = $1`, [
        email,
      ])
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0].resetPasswordToken;
        }
        return undefined;
      });
  }
}
