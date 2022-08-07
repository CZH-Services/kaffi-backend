import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { CanAssignOrRevokePermission } from 'src/guards/canAssignPermission.guard';
import { AssignPermission } from './dto/assignPermission';
import { PermissionResponse } from './dto/permissionResponse';
import { PermissionServices } from './permission.services';
import { HasAccessGuard, SetPermission } from 'src/guards/hasAccess.guard';
import { Role } from 'src/roles/entities/role';
import { Committee } from 'src/committee/entities/committee';

@ApiTags('Permissions')
@Controller('permission')
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionServices: PermissionServices) {}

  @UseGuards(CanAssignOrRevokePermission)
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
  async assignPermissionToUser(
    @Body() permission: AssignPermission,
  ): Promise<boolean> {
    return this.permissionServices.assignPermissionToUser(permission);
  }

  @UseGuards(CanAssignOrRevokePermission)
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
  async revokePermissionFromUser(@Param('id') id: number): Promise<boolean> {
    return this.permissionServices.revokePermissionFromUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get auth user permissions' })
  @ApiResponse({
    status: 200,
    description: 'User permissions records',
    type: [PermissionResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getPermissionsByEmail(@Req() req): Promise<PermissionResponse[]> {
    return this.permissionServices.getPermissionsByEmail(
      req.user.email.toLowerCase(),
    );
  }

  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.ADVISING },
    { role: Role.MEMBER, committee: Committee.SCHOLARSHIP },
  ])
  @UseGuards(HasAccessGuard)
  @Get('/:userId')
  @ApiOperation({ summary: 'Get all user permissions' })
  @ApiResponse({
    status: 200,
    description: 'User permissions records',
    type: [PermissionResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getPermissions(
    @Param('userId') userId: number,
  ): Promise<PermissionResponse[]> {
    return this.permissionServices.getPermissions(userId);
  }
}
