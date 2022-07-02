import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommitteesServices } from 'src/committee/committees.service';
import { RolesServices } from 'src/roles/roles.service';
import { UsersServices } from 'src/user/users.services';
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

  async assignPermissionToUser(permission: AssignPermission): Promise<boolean> {
    await this.userServices.findOneById(permission.userId);
    await this.rolesServices.getRoleById(permission.roleId);
    await this.committeeServices.getCommitteeById(permission.committeeId);
    const existingPermission = await this.permissionRepository.getPermission(
      permission.userId,
      permission.roleId,
      permission.committeeId,
    );
    if (existingPermission) {
      throw new HttpException(
        'Permission already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async getPermission(
    userId: number,
    roleId: number,
    committeeId: number,
  ): Promise<PermissionResponse> {
    return <PermissionResponse>(
      await this.permissionRepository.getPermission(userId, roleId, committeeId)
    );
  }

  async getPermissionById(id: number): Promise<PermissionResponse> {
    const permission = await this.permissionRepository.getPermissionById(id);
    if (!permission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    return <PermissionResponse>permission;
  }
}
