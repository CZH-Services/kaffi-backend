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
import { CommitteesServices } from './committees.service';
import { CommitteeResponse } from './dto/committeeResponse';
import { CreateCommittee } from './dto/createCommittee';
import { DeleteCommittee } from './dto/deleteCommittee';
import { UpdateCommittee } from './dto/updateCommittee';

@ApiTags('Committees')
@Controller('committees')
export class CommitteesController {
  constructor(private readonly committeesServices: CommitteesServices) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commitee' })
  @ApiResponse({
    status: 200,
    description: 'Committee created',
    type: CommitteeResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createOne(
    @Body() committee: CreateCommittee,
  ): Promise<CommitteeResponse> {
    return this.committeesServices.createCommittee(committee);
  }

  @Get()
  @ApiOperation({ summary: 'Get all committees' })
  @ApiResponse({
    status: 200,
    description: 'Committees records',
    type: [CommitteeResponse],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async findAll(): Promise<CommitteeResponse[]> {
    return this.committeesServices.getCommittees();
  }

  @Put()
  @ApiOperation({ summary: 'Update a committee' })
  @ApiResponse({
    status: 200,
    description: 'Committee updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(@Body() committee: UpdateCommittee): Promise<boolean> {
    return this.committeesServices.updateCommittee(committee);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a committee' })
  @ApiResponse({
    status: 200,
    description: 'Committee deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(@Param() id: DeleteCommittee): Promise<boolean> {
    return this.committeesServices.deleteCommittee(id.id);
  }
}
