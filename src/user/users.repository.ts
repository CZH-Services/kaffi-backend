import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { CreateUser } from './dto/createUser';
import { ProfileInfoResponse } from './dto/profileInfoResponse';
import { UpdateUserInfoRequest } from './dto/updateUserInfoRequest';
import { UserResponse } from './dto/userResponse';
import { User } from './entities/user';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PostgresService) {}

  async createUser(user: CreateUser): Promise<Boolean> {
    return await this.database
      .query(
        `INSERT INTO kaffiuser (firstname, lastname, email, password, authWithGoogle, profileUrl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.authWithGoogle,
          user.profile,
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
      .query(`SELECT * FROM kaffiuser WHERE email = $1`, [email])
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

  async getUsers(): Promise<User[]> {
    return this.database.query(`SELECT * FROM kaffiuser`).then((res) => {
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
}
