import { Injectable } from '@nestjs/common';
import { NonStaffRoles, Role, StaffRoles } from './entities/role';

@Injectable()
export class RolesServices {
  constructor() {}

  getRoles(): string[] {
    return Object.values(Role);
  }

  getStaffRoles(): string[] {
    return Object.values(StaffRoles);
  }

  getNonStaffRoles(): string[] {
    return Object.values(NonStaffRoles);
  }

  getRoleByName(role: string): boolean {
    return Object.values(Role)
      .map((role) => role.toString())
      .includes(role);
  }
}
