import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddProgramDescription } from '../dto/descriptions/addProgramDescription';
import { ProgramDescriptionResponse } from '../dto/descriptions/programDescriptionResponse';
import { UpdateProgramDescription } from '../dto/descriptions/updateProgramDescription';
import { ProgramDescription } from '../entities/programDescription';
import { ProgramDescriptionRepository } from '../repositories/programDescriptions.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class ProgramDescriptionsServices {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly descriptionRepository: ProgramDescriptionRepository,
  ) {}

  async addProgramDescription(
    description: AddProgramDescription,
  ): Promise<boolean> {
    await this.programServices.getProgram(description.programId);
    const rank =
      await this.descriptionRepository.getHighestProgramDescriptionRank(
        description.programId,
      );
    const newDescription = <ProgramDescription>description;
    newDescription.rank = rank + 1;
    return await this.descriptionRepository.createDescription(
      <ProgramDescription>newDescription,
    );
  }

  async getProgramDescriptions(
    programId: number,
  ): Promise<ProgramDescriptionResponse[]> {
    await this.programServices.getProgram(programId);
    const descriptions =
      await this.descriptionRepository.getProgramDescriptions(programId);
    return <ProgramDescriptionResponse[]>descriptions;
  }

  async deleteProgramDescription(id: number): Promise<boolean> {
    const exists = await this.descriptionRepository.getDescription(id);
    if (!exists) {
      throw new NotFoundException('Description not found');
    }
    await this.descriptionRepository.decreaseProgramDescriptionRanks(
      exists.programId,
      exists.rank,
    );
    return await this.descriptionRepository.deleteDescription(id);
  }

  async updateProgramDescription(
    updatedDescription: UpdateProgramDescription,
  ): Promise<boolean> {
    const description = await this.descriptionRepository.getDescription(
      updatedDescription.id,
    );

    if (!description) {
      throw new NotFoundException('Description not found');
    }

    const maxRank =
      await this.descriptionRepository.getHighestProgramDescriptionRank(
        description.programId,
      );

    if (updatedDescription.rank > maxRank || updatedDescription.rank <= 0) {
      throw new ForbiddenException('Invalid rank');
    }

    if (updatedDescription.rank !== description.rank) {
      const increment = updatedDescription.rank > description.rank;
      const minRank = increment
        ? description.rank + 1
        : updatedDescription.rank;
      const maxRank = increment
        ? updatedDescription.rank
        : description.rank - 1;
      await this.descriptionRepository.updateProgramDescriptionsRanks(
        description.programId,
        minRank,
        maxRank,
        !increment,
      );
    }

    return await this.descriptionRepository.updateDescription(
      <ProgramDescription>updatedDescription,
    );
  }
}
