import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommitteesRepository } from './committees.repository';
import { CommitteeResponse } from './dto/committeeResponse';
import { CreateCommittee } from './dto/createCommittee';
import { UpdateCommittee } from './dto/updateCommittee';
import { Committee } from './entities/committee';

@Injectable()
export class CommittesServices {
  constructor(private readonly committesRepository: CommitteesRepository) {}

  async createCommittee(
    committee: CreateCommittee,
  ): Promise<CommitteeResponse> {
    const existingCommittee = await this.committesRepository.getCommitteeByName(
      committee.name,
    );
    if (existingCommittee) {
      throw new BadRequestException('Committee already exists');
    }
    const newCommittee = await this.committesRepository.createCommittee(
      <Committee>committee,
    );
    return <CommitteeResponse>newCommittee;
  }

  async getCommittees(): Promise<CommitteeResponse[]> {
    const committees = await this.committesRepository.getCommittees();
    return committees.map((committee) => <CommitteeResponse>committee);
  }

  async updateCommittee(committee: UpdateCommittee): Promise<boolean> {
    const updated = await this.committesRepository.updateCommittee(
      <Committee>committee,
    );
    if (!updated) {
      throw new NotFoundException('Committee not found');
    }
    return updated;
  }

  async deleteCommittee(id: number): Promise<boolean> {
    const deleted = await this.committesRepository.deleteCommittee(id);
    if (!deleted) {
      throw new NotFoundException('Committee not found');
    }
    return deleted;
  }
}
