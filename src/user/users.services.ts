import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersServices {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly users = [
    {
      id: 1,
      name: 'John',
      email: 'john@email.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'jane@email.com',
      password: '123456',
    },
  ];

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}
