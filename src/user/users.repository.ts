import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PostgresService) {}
}
