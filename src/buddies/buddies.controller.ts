import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuddyService } from './buddies.service';
import { CreateBuddiesRequest } from './dto/createBuddiesRequest';
import { GetBuddiesResponse } from './dto/getBuddiesResponse';

@ApiTags('Buddies')
@Controller('buddies')
export class BuddiesController {
  constructor(private readonly blogService: BuddyService) {}

  @Get()
  @ApiOperation({ summary: 'Get buddies connection' })
  @ApiResponse({
    status: 200,
    type: [GetBuddiesResponse],
  })
  async findAllBuddies(): Promise<GetBuddiesResponse[]> {
    return await this.blogService.findAllBuddies();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get buddies connection' })
  @ApiResponse({
    status: 200,
    type: [GetBuddiesResponse],
  })
  async findUserBuddies(
    @Param('userId') userId: number,
  ): Promise<GetBuddiesResponse[]> {
    return await this.blogService.findUserBuddies(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create buddies connection' })
  @ApiResponse({
    status: 200,
    description: 'buddies connection created',
    type: Boolean,
  })
  async createBuddies(@Body() data: CreateBuddiesRequest): Promise<boolean> {
    return await this.blogService.createBuddiesConnection(data);
  }

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
