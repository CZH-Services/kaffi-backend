import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddProgramCycle } from '../dto/cycles/addProgramCycle';
import { ProgramCycleResponse } from '../dto/cycles/programCycleResponse';
import { UpdateProgramCycle } from '../dto/cycles/updateProgramCycle';
import { ProgramCycle } from '../entities/programCycle';
import { ProgramCyclesRepository } from '../repositories/programCycles.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class ProgramCyclesService {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly cyclesRepository: ProgramCyclesRepository,
  ) {}

  async addCycle(newCycle: AddProgramCycle): Promise<boolean> {
    await this.programServices.getProgram(newCycle.programId);
    if (newCycle.submission > newCycle.deadline) {
      throw new BadRequestException('Submission date cannot be after deadline');
    } else if (newCycle.deadline > newCycle.results) {
      throw new BadRequestException('Deadline cannot be after results date');
    }
    if (newCycle.active) {
      await this.cyclesRepository.deactivateProgramCycles(newCycle.programId);
    }
    return this.cyclesRepository.addCycle(<ProgramCycle>newCycle);
  }

  async getActiveCycle(programId: number): Promise<ProgramCycleResponse> {
    await this.programServices.getProgram(programId);
    const activeCycle = await this.cyclesRepository.getActiveCycle(programId);
    return <ProgramCycleResponse>activeCycle;
  }

  async getProgramCycles(programId: number) {
    await this.programServices.getProgram(programId);
    const cycles = await this.cyclesRepository.getProgramCycles(programId);
    return <ProgramCycleResponse[]>cycles;
  }

  async updateCycle(updatedCycle: UpdateProgramCycle): Promise<boolean> {
    const exists = await this.cyclesRepository.getCycle(updatedCycle.id);
    if (!exists) {
      throw new NotFoundException('Cycle does not exist');
    }
    if (updatedCycle.submission > updatedCycle.deadline) {
      throw new BadRequestException('Submission date cannot be after deadline');
    } else if (updatedCycle.deadline > updatedCycle.results) {
      throw new BadRequestException('Deadline cannot be after results date');
    }
    if (updatedCycle.active) {
      await this.cyclesRepository.deactivateProgramCycles(
        updatedCycle.programId,
      );
    }
    return this.cyclesRepository.updateCycle(<ProgramCycle>updatedCycle);
  }

  async deleteCycle(id: number): Promise<boolean> {
    const exists = await this.cyclesRepository.getCycle(id);
    if (!exists) {
      throw new NotFoundException('Cycle does not exist');
    }
    if (exists.active) {
      throw new ForbiddenException('Cannot delete active cycle');
    }
    return this.cyclesRepository.deleteCycle(id);
  }

  async getProgramCycle(id: number): Promise<ProgramCycleResponse> {
    const exists = await this.cyclesRepository.getCycle(id);
    if (!exists) {
      throw new NotFoundException('Cycle does not exist');
    }
    return <ProgramCycleResponse>exists;
  }
}
