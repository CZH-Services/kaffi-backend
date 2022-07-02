import { Injectable } from '@nestjs/common';
import { Role } from './entities/role';

@Injectable()
export class RolesServices {
  constructor() {}

  getRoles(): string[] {
    return Object.values(Role);
  }

  getRoleByName(role: string): boolean {
    return Object.values(Role).includes(<Role>role);
  }
}
