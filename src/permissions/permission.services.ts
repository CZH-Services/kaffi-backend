import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommitteesServices } from 'src/committee/committees.service';
import { Role } from 'src/roles/entities/role';
import { RolesServices } from 'src/roles/roles.service';
import { UsersServices } from 'src/user/services/users.services';
import { AssignPermission } from './dto/assignPermission';
import { PermissionResponse } from './dto/permissionResponse';
import { Permission } from './entities/permission';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionServices {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly userServices: UsersServices,
    private readonly rolesServices: RolesServices,
    private readonly committeeServices: CommitteesServices,
  ) {}

  validatePermission(permission: AssignPermission): boolean {
    const role = <string>permission.role;
    if (
      [<string>Role.ADMIN, <string>Role.BUDDY, <string>Role.VOLUNTEER].includes(
        role,
      )
    ) {
      if (permission.committee) {
        throw new HttpException(
          role + ' cannot have a committee',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return true;
      }
    } else if ([<string>Role.MEMBER, <string>Role.STUDENT].includes(role)) {
      if (permission.committee) {
        return true;
      } else {
        throw new HttpException(
          role + ' must have a committee',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async assignPermissionToUser(permission: AssignPermission): Promise<boolean> {
    await this.userServices.findOneById(permission.userId);
    if (!this.rolesServices.getRoleByName(permission.role)) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    if (
      permission.committee &&
      !this.committeeServices.getCommitteeByName(permission.committee)
    ) {
      throw new HttpException('Committee not found', HttpStatus.NOT_FOUND);
    }

    const existingPermission = await this.permissionRepository.getPermission(
      permission.userId,
      permission.role,
      permission.committee,
    );
    if (existingPermission) {
      throw new HttpException(
        'Permission already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.validatePermission(permission);
    return await this.permissionRepository.assignPermissionToUser(
      <Permission>permission,
    );
  }

  async revokePermissionFromUser(permissionId: number): Promise<boolean> {
    await this.getPermissionById(permissionId);
    return await this.permissionRepository.revokePermissionFromUser(
      permissionId,
    );
  }

  async getPermissions(userId: number): Promise<PermissionResponse[]> {
    await this.userServices.findOneById(userId);
    return <PermissionResponse[]>(
      await this.permissionRepository.getPermissions(userId)
    );
  }

  async getPermissionsByEmail(email: string): Promise<PermissionResponse[]> {
    const user = await this.userServices.findOne(email);
    return <PermissionResponse[]>(
      await this.permissionRepository.getPermissions(user.id)
    );
  }

  async getPermission(
    userId: number,
    role: string,
    committee: string,
  ): Promise<PermissionResponse> {
    return <PermissionResponse>(
      await this.permissionRepository.getPermission(userId, role, committee)
    );
  }

  async getPermissionById(id: number): Promise<PermissionResponse> {
    const permission = await this.permissionRepository.getPermissionById(id);
    if (!permission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    return <PermissionResponse>permission;
  }

  async isAdmin(userId: number): Promise<boolean> {
    return await this.permissionRepository.isAdmin(userId);
  }

  async deleteUserStaffRoles(userId: number): Promise<boolean> {
    const staffRoles = this.rolesServices.getStaffRoles();
    return await this.permissionRepository.deleteUserStaffRoles(
      userId,
      staffRoles,
    );
  }

  async getTotalNumberOfVolunteers(): Promise<number> {
    return await this.permissionRepository.getTotalNumberOfVolunteers();
  }
}
