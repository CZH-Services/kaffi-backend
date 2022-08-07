import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
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
import { Committee } from 'src/committee/entities/committee';
import { HasAccessGuard, SetPermission } from 'src/guards/hasAccess.guard';
import { Role } from 'src/roles/entities/role';
import { BuddyService } from './buddies.service';
import { CreateBuddiesRequest } from './dto/createBuddiesRequest';
import { GetBuddiesResponse } from './dto/getBuddiesResponse';

@ApiTags('Buddies')
@Controller('buddies')
export class BuddiesController {
  constructor(private readonly blogService: BuddyService) {}

  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.ADVISING },
  ])
  @UseGuards(HasAccessGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get buddies connection' })
  @ApiResponse({
    status: 200,
    type: [GetBuddiesResponse],
  })
  async findAllBuddies(): Promise<GetBuddiesResponse[]> {
    return await this.blogService.findAllBuddies();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/for-auth-user')
  @ApiOperation({ summary: 'Get uset buddies connection' })
  @ApiResponse({
    status: 200,
    type: [GetBuddiesResponse],
  })
  async findUserBuddies(@Req() req: any): Promise<GetBuddiesResponse[]> {
    req.user.email = req.user.email.toLowerCase();
    return await this.blogService.findUserBuddies(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.ADVISING },
  ])
  @UseGuards(HasAccessGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create buddies connection' })
  @ApiResponse({
    status: 200,
    description: 'buddies connection created',
    type: Boolean,
  })
  async createBuddies(
    @Body() data: CreateBuddiesRequest,
    @Req() req: any,
  ): Promise<boolean> {
    req.user.email = req.user.email.toLowerCase();
    return await this.blogService.createBuddiesConnection({
      ...data,
      connectedByEmail: req.user.email,
    });
  }

  @UseGuards(JwtAuthGuard)
  @SetPermission([
    { role: Role.ADMIN, committee: null },
    { role: Role.MEMBER, committee: Committee.ADVISING },
  ])
  @UseGuards(HasAccessGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete buddies connection' })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  async deleteBuddiesConnection(@Param('id') id: number): Promise<boolean> {
    return await this.blogService.deleteBuddiesConnection(id);
  }
}
