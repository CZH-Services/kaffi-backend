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
import { AddProgramCycle } from '../dto/cycles/addProgramCycle';
import { ProgramCycleResponse } from '../dto/cycles/programCycleResponse';
import { DeleteProgramCycle } from '../dto/cycles/deleteProgramCycle';
import { GetProgramCycle } from '../dto/cycles/getProgramCycle';
import { GetProgramCycles } from '../dto/cycles/getProgramCycles';
import { UpdateProgramCycle } from '../dto/cycles/updateProgramCycle';
import { ProgramCyclesService } from '../services/programCycles.service';

@Controller('programCycles')
@ApiTags('Program Cycles')
export class CyclesController {
  constructor(private readonly cyclesService: ProgramCyclesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a cycle' })
  @ApiResponse({
    status: 200,
    description: 'The cycle has been successfully returned.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Program has not been found.' })
  async addCycle(@Body() cycle: AddProgramCycle): Promise<boolean> {
    return this.cyclesService.addCycle(cycle);
  }

  @Get(':programId')
  @ApiOperation({ summary: 'Gets the active program cycle' })
  @ApiResponse({
    status: 200,
    description: 'The program active cycle has been successfully returned.',
    type: ProgramCycleResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Program has not been found.' })
  async getActiveCycle(
    @Param() programId: GetProgramCycle,
  ): Promise<ProgramCycleResponse> {
    return this.cyclesService.getActiveCycle(programId.programId);
  }

  @Get('cycles/:programId')
  @ApiOperation({ summary: 'Gets a program cycles' })
  @ApiResponse({
    status: 200,
    description: 'The cycles has been successfully returned.',
    type: [ProgramCycleResponse],
  })
  async getProgramCycles(
    @Param() programId: GetProgramCycles,
  ): Promise<ProgramCycleResponse[]> {
    return this.cyclesService.getProgramCycles(programId.programId);
  }

  @Put()
  @ApiOperation({ summary: 'Updates a cycle' })
  @ApiResponse({
    status: 200,
    description: 'The cycle has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Cycle has not been found.' })
  async updateCycle(@Body() updatedCycle: UpdateProgramCycle) {
    return this.cyclesService.updateCycle(updatedCycle);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a cycle' })
  @ApiResponse({
    status: 200,
    description: 'The cycle has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Cycle has not been found.' })
  async deleteCycle(@Param() cycleId: DeleteProgramCycle) {
    return this.cyclesService.deleteCycle(cycleId.id);
  }
}
