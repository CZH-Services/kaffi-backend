import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
@Injectable()
export class PostgresService {
  private pool: Pool;

  constructor() {
    const env = process.env;
    this.pool = new Pool({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DATABASE,
      password: env.POSTGRES_PASSWORD,
      port: parseInt(env.POSTGRES_PORT),
    });
    require('pg').types.setTypeParser(1082, (value) => value);
  }

  async query(query: string, params: any[] = []): Promise<any> {
    return this.pool.query(query, params);
  }
}
