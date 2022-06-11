import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddProgramCriteria } from '../dto/criteria/addProgramCriterion';
import { ProgramCriterionResponse } from '../dto/criteria/programCriteriaResponse';
import { UpdateProgramCriterion } from '../dto/criteria/updateProgramCriterion';
import { ProgramCriterion } from '../entities/programCriterion';
import { ProgramCriteriaRepository } from '../repositories/programCriteria.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class ProgramCriteriaServices {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly criteriaRepository: ProgramCriteriaRepository,
  ) {}

  async addProgramCriterion(criterion: AddProgramCriteria): Promise<boolean> {
    await this.programServices.getProgram(criterion.programId);
    const rank = await this.criteriaRepository.getHighestProgramCriterionRank(
      criterion.programId,
    );
    const newCriterion = <ProgramCriterion>criterion;
    newCriterion.rank = rank + 1;
    return await this.criteriaRepository.createCriterion(
      <ProgramCriterion>newCriterion,
    );
  }

  async getProgramCriteria(
    programId: number,
  ): Promise<ProgramCriterionResponse[]> {
    await this.programServices.getProgram(programId);
    const criteria = await this.criteriaRepository.getProgramCriteria(
      programId,
    );
    return <ProgramCriterionResponse[]>criteria;
  }

  async deleteProgramCriterion(id: number): Promise<boolean> {
    const exists = await this.criteriaRepository.getCriterion(id);
    if (!exists) {
      throw new NotFoundException('Criterion not found');
    }
    await this.criteriaRepository.decreaseProgramCriteriaRanks(
      exists.programId,
      exists.rank,
    );
    return await this.criteriaRepository.deleteCriterion(id);
  }

  async updateProgramCriterion(
    updatedCriterion: UpdateProgramCriterion,
  ): Promise<boolean> {
    const criterion = await this.criteriaRepository.getCriterion(
      updatedCriterion.id,
    );

    if (!criterion) {
      throw new NotFoundException('Criterion not found');
    }

    const maxRank =
      await this.criteriaRepository.getHighestProgramCriterionRank(
        criterion.programId,
      );

    if (updatedCriterion.rank > maxRank || updatedCriterion.rank <= 0) {
      throw new ForbiddenException('Invalid rank');
    }

    if (updatedCriterion.rank !== criterion.rank) {
      const increment = updatedCriterion.rank > criterion.rank;
      const minRank = increment ? criterion.rank + 1 : updatedCriterion.rank;
      const maxRank = increment ? updatedCriterion.rank : criterion.rank - 1;
      await this.criteriaRepository.updateProgramCriteriaRanks(
        criterion.programId,
        minRank,
        maxRank,
        !increment,
      );
    }

    return await this.criteriaRepository.updateCriterion(
      <ProgramCriterion>updatedCriterion,
    );
  }
}
