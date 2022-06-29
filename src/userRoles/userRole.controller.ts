import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignUserRole } from './dto/assignUserRole';
import { UserRoleResponse } from './dto/userRoleResponse';
import { UserRoleServices } from './userRole.service';

@ApiTags('User Roles')
@Controller('userRoles')
export class UserRoleController {
  constructor(private readonly userRoleServices: UserRoleServices) {}

  @Post()
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({
    status: 200,
    description: 'User role assigned',
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
  async assignRolePermissionToUser(
    @Body() userRole: AssignUserRole,
  ): Promise<boolean> {
    return this.userRoleServices.assignRolePermissionToUser(userRole);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Revoke a role from a user' })
  @ApiResponse({
    status: 200,
    description: 'User role revoked',
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
  async revokeRolePermissionFromUser(
    @Param('id') id: number,
  ): Promise<boolean> {
    return this.userRoleServices.revokeRolePermissionFromUser(id);
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get all user roles by user' })
  @ApiResponse({
    status: 200,
    description: 'User roles records',
    type: [UserRoleResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUserRoles(
    @Param('userId') userId: number,
  ): Promise<UserRoleResponse[]> {
    return this.userRoleServices.getUserRoles(userId);
  }
}
