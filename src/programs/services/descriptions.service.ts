import { Injectable, NotFoundException } from '@nestjs/common';
import { AddProgramDescription } from '../dto/descriptions/addProgramDescription';
import { ProgramDescriptionResponse } from '../dto/descriptions/programDescriptionResponse';
import { UpdateProgramDescription } from '../dto/descriptions/updateProgramDescription';
import { ProgramDescription } from '../entities/programDescription';
import { DescriptionRepository } from '../repositories/descriptions.repository';
import { ProgramServices } from './programs.service';

@Injectable()
export class DescriptionsServices {
  constructor(
    private readonly programServices: ProgramServices,
    private readonly descriptionRepository: DescriptionRepository,
  ) {}

  async addProgramDescription(
    description: AddProgramDescription,
  ): Promise<boolean> {
    await this.programServices.getProgram(description.programId);
    return await this.descriptionRepository.createDescription(
      <ProgramDescription>description,
    );
  }

  async getProgramDescriptions(
    programId: number,
  ): Promise<ProgramDescriptionResponse[]> {
    await this.programServices.getProgram(programId);
    const descriptions = await this.descriptionRepository.getDescriptions(
      programId,
    );
    return <ProgramDescriptionResponse[]>descriptions;
  }

  async deleteProgramDescription(id: number) {
    const exists = await this.descriptionRepository.getDescription(id);
    if (!exists) {
      throw new NotFoundException('Description not found');
    }
    return await this.descriptionRepository.deleteDescription(id);
  }

  async updateProgramDescription(newDescription: UpdateProgramDescription) {
    const exists = await this.descriptionRepository.getDescription(
      newDescription.id,
    );
    if (!exists) {
      throw new NotFoundException('Description not found');
    }
    return await this.descriptionRepository.updateDescription(
      <ProgramDescription>newDescription,
    );
  }
}
