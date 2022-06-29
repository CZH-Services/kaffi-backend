import { Injectable } from '@nestjs/common';
import { CommitteesServices } from 'src/committee/committees.service';
import { RolesServices } from 'src/roles/roles.service';
import { UsersServices } from 'src/user/users.services';
import { AssignUserRole } from './dto/assignUserRole';
import { UserRoleResponse } from './dto/userRoleResponse';
import { UserRoleRepository } from './userRole.repository';

@Injectable()
export class UserRoleServices {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
  ) // private readonly userServices: UsersServices,
  // private readonly rolesServices: RolesServices,
  // private readonly committeeServices: CommitteesServices,
  {}

  async assignRolePermissionToUser(userRole: AssignUserRole): Promise<boolean> {
    // check if the user exists
    // check if the user role is already assigned
    // check if the role exists
    // check if the committee exists

    return false;
  }

  async revokeRolePermissionFromUser(userRoleId: number): Promise<boolean> {
    // check if the user role exists

    return false;
  }

  async getUserRoles(userId: number): Promise<UserRoleResponse[]> {
    // return the user roles

    return [];
  }
}
