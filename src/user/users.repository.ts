import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}
}
