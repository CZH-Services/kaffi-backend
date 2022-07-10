import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { AddProgramCriteria } from '../dto/criteria/addProgramCriterion';
import { DeleteProgramCriterion } from '../dto/criteria/deleteProgramCriterion';
import { GetProgramCriteria } from '../dto/criteria/getProgramCriteria';
import { ProgramCriterionResponse } from '../dto/criteria/programCriteriaResponse';
import { UpdateProgramCriterion } from '../dto/criteria/updateProgramCriterion';
import { ProgramCriteriaServices } from '../services/programCriteria.service';

@ApiTags('Program Criteria')
@Controller('programCriteria')
export class CriteriaController {
  constructor(
    private readonly programCriterionServices: ProgramCriteriaServices,
  ) {}

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Creates a program criterion' })
  @ApiResponse({
    status: 200,
    description: 'The program criterion has been successfully created.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program does not exist.',
  })
  async createProgramCriterion(
    @Body() programCriterion: AddProgramCriteria,
  ): Promise<boolean> {
    return this.programCriterionServices.addProgramCriterion(programCriterion);
  }

  @Get(':programId')
  @ApiOperation({ summary: 'Gets all program criteria' })
  @ApiResponse({
    status: 200,
    description: 'The program criteria have been successfully retrieved.',
    type: [ProgramCriterionResponse],
  })
  async getProgramCriteria(
    @Param() programId: GetProgramCriteria,
  ): Promise<ProgramCriterionResponse[]> {
    return this.programCriterionServices.getProgramCriteria(
      programId.programId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a program criterion' })
  @ApiResponse({
    status: 200,
    description: 'The program criterion has been successfully deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program criterion does not exist.',
  })
  async deleteProgramCriterion(
    @Param() programCriterionId: DeleteProgramCriterion,
  ): Promise<boolean> {
    return this.programCriterionServices.deleteProgramCriterion(
      programCriterionId.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Put()
  @ApiOperation({ summary: 'Updates a program criterion' })
  @ApiResponse({
    status: 200,
    description: 'The program criterion has been successfully updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program criterion does not exist.',
  })
  async updateProgramCriterion(
    @Body() programCriterion: UpdateProgramCriterion,
  ): Promise<boolean> {
    return this.programCriterionServices.updateProgramCriterion(
      programCriterion,
    );
  }
}
