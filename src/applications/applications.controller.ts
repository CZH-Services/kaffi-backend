import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Put,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Committee } from 'src/committee/entities/committee';
import { HasAccessGuard, SetPermission } from 'src/guards/hasAccess.guard';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { Role } from 'src/roles/entities/role';
import { ApplicationService } from './applications.service';
import { AddApplication } from './entities/AddApplication';
import { ApplicationResponse } from './entities/ApplicationResponse';
import { UpdateApplication } from './entities/UpdateApplicationStatus';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.SCHOLARSHIP },
  ])
  @UseGuards(HasAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creates a user application' })
  @ApiResponse({
    status: 200,
    description: 'Application created',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async addApplication(
    @Body() newApplication: AddApplication,
  ): Promise<boolean> {
    return this.applicationService.addApplication(newApplication);
  }

  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.SCHOLARSHIP },
  ])
  @UseGuards(HasAccessGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes an application' })
  @ApiResponse({
    status: 200,
    description: 'Application deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteApplication(@Param('id') id: number): Promise<boolean> {
    return await this.applicationService.deleteApplication(id);
  }

  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.SCHOLARSHIP },
  ])
  @UseGuards(HasAccessGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets applications' })
  @ApiResponse({
    status: 200,
    description: 'Applications returned',
    type: [ApplicationResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getApplications(): Promise<ApplicationResponse[]> {
    return await this.applicationService.getApplications();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets user applications' })
  @ApiResponse({
    status: 200,
    description: 'Applications returned',
    type: [ApplicationResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfileApplications(
    @Request() req: any,
  ): Promise<ApplicationResponse[]> {
    const userEmail = req.user['email'].toLowerCase();
    return await this.applicationService.getProfileApplications(userEmail);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.SCHOLARSHIP },
  ])
  @UseGuards(HasAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates application' })
  @ApiResponse({
    status: 200,
    description: 'Application updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateApplication(
    @Body()
    updateApplication: UpdateApplication,
  ): Promise<boolean> {
    return await this.applicationService.updateApplication(updateApplication);
  }
}
