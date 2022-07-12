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
import { AssignPermission } from './dto/assignPermission';
import { PermissionResponse } from './dto/permissionResponse';
import { PermissionServices } from './permission.services';

@ApiTags('Permissions')
@Controller('permission')
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionServices: PermissionServices) {}

  @UseGuards(IsAdminGuard)
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

  @UseGuards(IsAdminGuard)
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
    return this.permissionServices.getPermissionsByEmail(req.user.email);
  }

  @UseGuards(IsAdminGuard)
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
