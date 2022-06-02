import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateRole } from './dto/createRole';
import { RoleResponse } from './dto/roleResponse';
import { UpdateRole } from './dto/updateRole';
import { Role } from './entities/role';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesServices {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(role: CreateRole): Promise<RoleResponse> {
    const existingRole = await this.rolesRepository.getRoleByName(role.name);
    if (existingRole) {
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
    }
    const newRole = await this.rolesRepository.createRole(<Role>role);
    return <RoleResponse>newRole;
  }

  async getRoles(): Promise<RoleResponse[]> {
    const roles = await this.rolesRepository.getRoles();
    return roles.map((role) => <RoleResponse>role);
  }

  async updateRole(role: UpdateRole): Promise<boolean> {
    const updated = await this.rolesRepository.updateRole(<Role>role);
    if (!updated) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return updated;
  }

  async deleteRole(id: number): Promise<boolean> {
    const deleted = await this.rolesRepository.deleteRole(id);
    if (!deleted) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return deleted;
  }
}
