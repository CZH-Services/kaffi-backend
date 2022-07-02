import { Injectable } from '@nestjs/common';
import { CommitteesServices } from 'src/committee/committees.service';
import { RolesServices } from 'src/roles/roles.service';
import { UsersServices } from 'src/user/users.services';
import { AssignPermission } from './dto/assignPermission';
import { PermissionResponse } from './dto/permissionResponse';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionServices {
  constructor(
    private readonly permissionRepository: PermissionRepository, // private readonly userServices: UsersServices, // private readonly rolesServices: RolesServices, // private readonly committeeServices: CommitteesServices,
  ) {}

  async assignPermissionToUser(permission: AssignPermission): Promise<boolean> {
    // check if the user exists
    // check if the user role is already assigned
    // check if the role exists
    // check if the committee exists

    return false;
  }

  async revokePermissionFromUser(permissionId: number): Promise<boolean> {
    // check if the user role exists

    return false;
  }

  async getPermissions(userId: number): Promise<PermissionResponse[]> {
    // return the user roles

    return [];
  }
}
