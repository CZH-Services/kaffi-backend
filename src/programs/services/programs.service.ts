import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgram } from '../dto/programs/createProgram';
import { DetailedProgramResponse } from '../dto/programs/detailedProgramResponse';
import { ProgramResponse } from '../dto/programs/programResponse';
import { RowProgramResponse } from '../dto/programs/rowProgramResponse';
import { UpdateProgram } from '../dto/programs/updateProgram';
import { Program } from '../entities/program';
import { ProgramCriteriaRepository } from '../repositories/programCriteria.repository';
import { ProgramCyclesRepository } from '../repositories/programCycles.repository';
import { ProgramDescriptionRepository } from '../repositories/programDescriptions.repository';
import { ProgramRepository } from '../repositories/programs.repository';

@Injectable()
export class ProgramServices {
  constructor(
    private readonly programRepository: ProgramRepository,
    private readonly programCyclesRepository: ProgramCyclesRepository,
    private readonly programDescriptionRepository: ProgramDescriptionRepository,
    private readonly programCriteriaRepository: ProgramCriteriaRepository,
  ) {}

  async createProgram(program: CreateProgram): Promise<boolean> {
    const newProgram = {
      id: 0,
      ...program,
    };
    return await this.programRepository.createProgram(<Program>newProgram);
  }

  async getProgramDetails(id: number): Promise<DetailedProgramResponse> {
    const program = await this.programRepository.getProgram(id);
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const programDescriptions =
      await this.programDescriptionRepository.getProgramDescriptions(id);
    const programCriteria =
      await this.programCriteriaRepository.getProgramCriteria(id);
    const activeCycle = await this.programCyclesRepository.getActiveCycle(
      program.id,
    );

    const result: DetailedProgramResponse = {
      id: program.id,
      name: program.name,
      icon: program.icon,
      highlights: program.highlights,
      programDescriptions,
      programCriteria,
      cycle: activeCycle,
    };
    return result;
  }

  async getProgram(id: number): Promise<ProgramResponse> {
    const program = await this.programRepository.getProgram(id);
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return <ProgramResponse>program;
  }

  async getRowPrograms(): Promise<RowProgramResponse[]> {
    const programs = await this.programRepository.getPrograms();
    return Promise.all(
      programs.map(async (program) => {
        const activeCycle = await this.programCyclesRepository.getActiveCycle(
          program.id,
        );
        if (activeCycle) {
          const result: RowProgramResponse = {
            id: program.id,
            name: program.name,
            icon: program.icon,
            caption: program.caption,
            description: program.description,
            cycle: activeCycle,
          };
          return result;
        }
      }),
    );
  }

  async updateProgram(program: UpdateProgram): Promise<boolean> {
    const updated = await this.programRepository.updateProgram(
      <Program>program,
    );
    if (!updated) {
      throw new NotFoundException('Program not found');
    }
    return updated;
  }

  async deleteProgram(id: number): Promise<boolean> {
    const deleted = await this.programRepository.deleteProgram(id);
    if (!deleted) {
      throw new NotFoundException('Program not found');
    }
    return deleted;
  }

  async getPrograms(): Promise<ProgramResponse[]> {
    const programs = await this.programRepository.getPrograms();
    return <ProgramResponse[]>programs;
  }
}
