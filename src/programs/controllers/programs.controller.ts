import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PROGRAM_MEDIA_PATH } from 'src/constants';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { FileStorageService } from 'src/services/FileStorageService';
import { CreateProgram } from '../dto/programs/createProgram';
import { DeleteProgram } from '../dto/programs/deleteProgram';
import { DetailedProgramResponse } from '../dto/programs/detailedProgramResponse';
import { GetProgram } from '../dto/programs/getProgram';
import { ProgramResponse } from '../dto/programs/programResponse';
import { RowProgramResponse } from '../dto/programs/rowProgramResponse';
import { UpdateProgram } from '../dto/programs/updateProgram';
import { ProgramServices } from '../services/programs.service';
import { GetProgramNamesAndIds } from '../dto/programs/getProgramNamesAndIds';

@Controller('programs')
@ApiTags('Programs')
export class ProgramController {
  constructor(private readonly programsServices: ProgramServices) {}

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Creates program' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'iconFile',
      FileStorageService.getSaveImageToStorage(PROGRAM_MEDIA_PATH),
    ),
  )
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully created.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async createProgram(
    @Body() program: CreateProgram,
    @UploadedFile() iconFile: Express.Multer.File,
  ): Promise<boolean> {
    return this.programsServices.createProgram(program, iconFile);
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Put()
  @ApiOperation({ summary: 'Updates a program' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'iconFile',
      FileStorageService.getSaveImageToStorage(PROGRAM_MEDIA_PATH),
    ),
  )
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
  async updateProgram(
    @Body() program: UpdateProgram,
    @UploadedFile() iconFile: Express.Multer.File,
  ): Promise<boolean> {
    return this.programsServices.updateProgram(program, iconFile);
  }

  @Get('programIcon/:icon')
  @ApiOperation({ summary: 'Returns program icon' })
  @ApiResponse({
    status: 200,
    description: 'The program icon has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Icon not found.',
  })
  async getProgramIcon(@Param('icon') icon: string, @Res() res): Promise<any> {
    res.sendFile(icon, { root: PROGRAM_MEDIA_PATH });
  }

  @Get('detailed/:id')
  @ApiOperation({ summary: 'Gets a program by Id' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully returned.',
    type: DetailedProgramResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program has not been found.',
  })
  async getProgramDetails(
    @Param() programId: GetProgram,
  ): Promise<DetailedProgramResponse> {
    return this.programsServices.getProgramDetails(programId.id);
  }

  @Get('rows')
  @ApiOperation({ summary: 'Gets row programs' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully returned.',
    type: RowProgramResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The program has not been found.',
  })
  async getRowPrograms(): Promise<RowProgramResponse[]> {
    return this.programsServices.getRowPrograms();
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
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

  @Get('names-and-ids')
  @ApiOperation({ summary: 'Gets all programs names and id' })
  @ApiResponse({
    status: 200,
    description: 'The programs names and id has been successfully returned.',
    type: [ProgramResponse],
  })
  async getProgramsNamesAndIds(): Promise<GetProgramNamesAndIds[]> {
    return this.programsServices.getProgramsNamesAndIds();
  }
}
