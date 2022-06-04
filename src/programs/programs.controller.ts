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
import { CreateProgram } from './dto/createProgram';
import { DeleteProgram } from './dto/deleteProgram';
import { GetProgram } from './dto/getProgram';
import { ProgramResponse } from './dto/programResponse';
import { UpdateProgram } from './dto/updateProgram';
import { ProgramServices } from './programs.service';

@Controller('programs')
@ApiTags('Programs')
export class ProgramController {
  constructor(private readonly programsServices: ProgramServices) {}

  //#region program
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

  @Get('/all')
  @ApiOperation({ summary: 'Gets all programs' })
  @ApiResponse({
    status: 200,
    description: 'The programs has been successfully returned.',
    type: [ProgramResponse],
  })
  async getPrograms(): Promise<ProgramResponse[]> {
    return this.programsServices.getPrograms();
  }
  //#endregion

  //#region program criteria
  async addProgramCriterion() {}
  async getProgramCriterion() {}
  async updateProgramCriterion() {}
  async deleteProgramCriterion() {}
  async getProgramCriterions() {}
  //#endregion

  //#region program cycle
  async addProgramCycle() {}
  async getProgramCycle() {}
  async updateProgramCycle() {}
  async deleteProgramCycle() {}
  async getProgramCycles() {}
  //#endregion

  //#region program description
  async addProgramDescription() {}
  async getProgramDescription() {}
  async updateProgramDescription() {}
  async deleteProgramDescription() {}
  async getProgramDescriptions() {}
  //#endregion
}
