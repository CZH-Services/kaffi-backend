import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesServices } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesServices: RolesServices) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles records',
    type: [String],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(): Promise<String[]> {
    return this.rolesServices.getRoles();
  }

  @Get('staff')
  @ApiOperation({ summary: 'Get staff roles' })
  @ApiResponse({
    status: 200,
    description: 'Staff Roles records',
    type: [String],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getStaffRoles(): Promise<String[]> {
    return this.rolesServices.getStaffRoles();
  }

  @Get('non-staff')
  @ApiOperation({ summary: 'Get non staff roles' })
  @ApiResponse({
    status: 200,
    description: 'Non Staff Roles records',
    type: [String],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getNonStaffRoles(): Promise<String[]> {
    return this.rolesServices.getNonStaffRoles();
  }
}
