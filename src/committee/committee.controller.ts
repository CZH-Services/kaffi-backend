import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommitteesServices } from './committees.service';

@ApiTags('Committees')
@Controller('committees')
export class CommitteesController {
  constructor(private readonly committeesServices: CommitteesServices) {}

  @Get()
  @ApiOperation({ summary: 'Get all committees' })
  @ApiResponse({
    status: 200,
    description: 'Committees records',
    type: [String],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(): Promise<string[]> {
    return this.committeesServices.getCommittees();
  }
}
