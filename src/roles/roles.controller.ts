import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRole } from './dto/createRole';
import { DeleteRole } from './dto/deleteRole';
import { RoleResponse } from './dto/roleResponse';
import { UpdateRole } from './dto/updateRole';
import { RolesServices } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesServices: RolesServices) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 200,
    description: 'Role created',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createOne(@Body() role: CreateRole): Promise<boolean> {
    return this.rolesServices.createRole(role);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles records',
    type: [RoleResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(): Promise<RoleResponse[]> {
    return this.rolesServices.getRoles();
  }

  @Put()
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'Role updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(@Body() role: UpdateRole): Promise<boolean> {
    return this.rolesServices.updateRole(role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'Role deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(@Param() id: DeleteRole): Promise<boolean> {
    return this.rolesServices.deleteRole(id.id);
  }
}
