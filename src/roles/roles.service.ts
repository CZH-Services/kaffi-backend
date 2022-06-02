import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateRole } from './dto/createRole';
import { RoleResponse } from './dto/roleResponse';
import { UpdateRole } from './dto/updateRole';
import { Role } from './entities/role';
import { RolesRepository } from './roles.repository';

@Injectable({ scope: Scope.REQUEST })
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
    const existingRole = await this.rolesRepository.getRoleById(role.id);
    if (!existingRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const updatedRole = await this.rolesRepository.updateRole(
      role.id,
      <Role>role,
    );
    return updatedRole;
  }

  async deleteRole(id: number): Promise<boolean> {
    const existingRole = await this.rolesRepository.getRoleById(id);
    if (!existingRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const deletedRole = await this.rolesRepository.deleteRole(id);
    return deletedRole;
  }
}
