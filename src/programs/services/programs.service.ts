import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgram } from '../dto/programs/createProgram';
import { ProgramResponse } from '../dto/programs/programResponse';
import { UpdateProgram } from '../dto/programs/updateProgram';
import { Program } from '../entities/program';
import { ProgramRepository } from '../repositories/programs.repository';

@Injectable()
export class ProgramServices {
  constructor(private readonly programRepository: ProgramRepository) {}

  async createProgram(program: CreateProgram): Promise<boolean> {
    return await this.programRepository.createProgram(<Program>program);
  }

  async getProgram(id: number): Promise<ProgramResponse> {
    const program = await this.programRepository.getProgram(id);
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    return <ProgramResponse>program;
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
