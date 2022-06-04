import { Injectable, NotFoundException } from '@nestjs/common';
import { AddProgramCriteria } from '../dto/criteria/addProgramCriterion';
import { ProgramCriterionResponse } from '../dto/criteria/programCriteriaResponse';
import { UpdateProgramCriterion } from '../dto/criteria/updateProgramCriterion';
import { Criterion } from '../entities/criterion';
import { CriteriaRepository } from '../repositories/criteria.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class CriteriaServices {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly criteriaRepository: CriteriaRepository,
  ) {}

  async addProgramCriterion(criterion: AddProgramCriteria): Promise<boolean> {
    await this.programServices.getProgram(criterion.programId);
    return await this.criteriaRepository.createCriterion(<Criterion>criterion);
  }

  async getProgramCriteria(
    programId: number,
  ): Promise<ProgramCriterionResponse[]> {
    await this.programServices.getProgram(programId);
    const criteria = await this.criteriaRepository.getCriteria(programId);
    return <ProgramCriterionResponse[]>criteria;
  }

  async deleteProgramCriterion(id: number): Promise<boolean> {
    const exists = await this.criteriaRepository.getCriterion(id);
    if (!exists) {
      throw new NotFoundException('Criterion not found');
    }
    return await this.criteriaRepository.deleteCriterion(id);
  }

  async updateProgramCriterion(
    newCriterion: UpdateProgramCriterion,
  ): Promise<boolean> {
    const exists = await this.criteriaRepository.getCriterion(newCriterion.id);
    if (!exists) {
      throw new NotFoundException('Criterion not found');
    }
    return await this.criteriaRepository.updateCriterion(
      <Criterion>newCriterion,
    );
  }
}
