import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { CreateUser } from './dto/createUser';
import { UserResponse } from './dto/userResponse';

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
}
