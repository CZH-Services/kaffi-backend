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
import { AddProgramDescription } from '../dto/descriptions/addProgramDescription';
import { DeleteProgramDescription } from '../dto/descriptions/deleteProgramDescription';
import { GetProgramDescriptions } from '../dto/descriptions/getProgramDescriptions';
import { ProgramDescriptionResponse } from '../dto/descriptions/programDescriptionResponse';
import { UpdateProgramDescription } from '../dto/descriptions/updateProgramDescription';
import { DescriptionsServices } from '../services/descriptions.service';

@ApiTags('Program Descriptions')
@Controller('programDescriptions')
export class ProgramDescriptionsController {
  constructor(
    private readonly programDescriptionServices: DescriptionsServices,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a program description' })
  @ApiResponse({
    status: 200,
    description: 'The program description has been successfully created.',
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
  async createProgramDescription(
    @Body() programDescription: AddProgramDescription,
  ): Promise<boolean> {
    return this.programDescriptionServices.addProgramDescription(
      programDescription,
    );
  }

  @Get(':programId')
  @ApiOperation({ summary: 'Gets all program descriptions' })
  @ApiResponse({
    status: 200,
    description: 'The program descriptions have been successfully retrieved.',
    type: [ProgramDescriptionResponse],
  })
  async getProgramDescriptions(
    @Param() programId: GetProgramDescriptions,
  ): Promise<ProgramDescriptionResponse[]> {
    return this.programDescriptionServices.getProgramDescriptions(
      programId.programId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a program description' })
  @ApiResponse({
    status: 200,
    description: 'The program description has been successfully deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program description has not been found.',
  })
  async deleteProgramDescription(
    @Param() programDescriptionId: DeleteProgramDescription,
  ): Promise<boolean> {
    return this.programDescriptionServices.deleteProgramDescription(
      programDescriptionId.id,
    );
  }

  @Put()
  @ApiOperation({ summary: 'Updates a program description' })
  @ApiResponse({
    status: 200,
    description: 'The program description has been successfully updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program description has not been found.',
  })
  async updateProgramDescription(
    @Body() programDescription: UpdateProgramDescription,
  ) {
    return this.programDescriptionServices.updateProgramDescription(
      programDescription,
    );
  }
}
