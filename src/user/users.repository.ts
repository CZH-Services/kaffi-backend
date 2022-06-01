import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}
}
