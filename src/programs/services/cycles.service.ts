import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddProgramCycle } from '../dto/cycles/addProgramCycle';
import { CycleResponse } from '../dto/cycles/cycleResponse';
import { UpdateProgramCycle } from '../dto/cycles/updateProgramCycle';
import { Cycle } from '../entities/cycle';
import { CyclesRepository } from '../repositories/cycles.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class CyclesService {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly cyclesRepository: CyclesRepository,
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
    return this.cyclesRepository.addCycle(<Cycle>newCycle);
  }

  async getActiveCycle(programId: number): Promise<CycleResponse> {
    await this.programServices.getProgram(programId);
    const activeCycle = await this.cyclesRepository.getActiveCycle(programId);
    return <CycleResponse>activeCycle;
  }

  async getProgramCycles(programId: number) {
    await this.programServices.getProgram(programId);
    const cycles = await this.cyclesRepository.getProgramCycles(programId);
    return <CycleResponse[]>cycles;
  }

  async updateCycle(updatedCycle: UpdateProgramCycle): Promise<boolean> {
    const exists = await this.cyclesRepository.getCycle(updatedCycle.id);
    if (!exists) {
      throw new NotFoundException('Cycle does not exist');
    }
    if (updatedCycle.active) {
      await this.cyclesRepository.deactivateProgramCycles(
        updatedCycle.programId,
      );
    }
    return this.cyclesRepository.updateCycle(<Cycle>updatedCycle);
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
}
