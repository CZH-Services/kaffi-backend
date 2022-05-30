import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable({ scope: Scope.REQUEST })
export class UsersServices {
  constructor(private readonly userRepository: UserRepository) {}
}
