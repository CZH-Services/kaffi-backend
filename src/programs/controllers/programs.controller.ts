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
import { CreateProgram } from '../dto/programs/createProgram';
import { DeleteProgram } from '../dto/programs/deleteProgram';
import { GetProgram } from '../dto/programs/getProgram';
import { ProgramResponse } from '../dto/programs/programResponse';
import { UpdateProgram } from '../dto/programs/updateProgram';
import { ProgramServices } from '../services/programs.service';

@Controller('programs')
@ApiTags('Programs')
export class ProgramController {
  constructor(private readonly programsServices: ProgramServices) {}

  @Post()
  @ApiOperation({ summary: 'Creates program' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully created.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async createProgram(@Body() program: CreateProgram): Promise<boolean> {
    return this.programsServices.createProgram(program);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets a program by Id' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully returned.',
    type: ProgramResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program has not been found.',
  })
  async getProgram(@Param() programId: GetProgram): Promise<ProgramResponse> {
    return this.programsServices.getProgram(programId.id);
  }

  @Put()
  @ApiOperation({ summary: 'Updates a program' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program has not been found.',
  })
  async updateProgram(@Body() program: UpdateProgram): Promise<boolean> {
    return this.programsServices.updateProgram(program);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a program' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program has not been found.',
  })
  async deleteProgram(@Param() programId: DeleteProgram): Promise<boolean> {
    return this.programsServices.deleteProgram(programId.id);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all programs' })
  @ApiResponse({
    status: 200,
    description: 'The programs has been successfully returned.',
    type: [ProgramResponse],
  })
  async getPrograms(): Promise<ProgramResponse[]> {
    return this.programsServices.getPrograms();
  }
}
