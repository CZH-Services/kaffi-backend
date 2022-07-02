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
export class CommitteesServices {
  constructor(private readonly committeeRepository: CommitteesRepository) {}

  async createCommittee(
    committee: CreateCommittee,
  ): Promise<CommitteeResponse> {
    const existingCommittee = await this.committeeRepository.getCommitteeByName(
      committee.name,
    );
    if (existingCommittee) {
      throw new BadRequestException('Committee already exists');
    }
    const newCommittee = await this.committeeRepository.createCommittee(
      <Committee>committee,
    );
    return <CommitteeResponse>newCommittee;
  }

  async getCommittees(): Promise<CommitteeResponse[]> {
    const committees = await this.committeeRepository.getCommittees();
    return committees.map((committee) => <CommitteeResponse>committee);
  }

  async getCommitteeById(id: number): Promise<CommitteeResponse> {
    const committee = await this.committeeRepository.getCommitteeById(id);
    if (!committee) {
      throw new NotFoundException('Committee not found');
    }
    return <CommitteeResponse>committee;
  }

  async updateCommittee(committee: UpdateCommittee): Promise<boolean> {
    const updated = await this.committeeRepository.updateCommittee(
      <Committee>committee,
    );
    if (!updated) {
      throw new NotFoundException('Committee not found');
    }
    return updated;
  }

  async deleteCommittee(id: number): Promise<boolean> {
    const deleted = await this.committeeRepository.deleteCommittee(id);
    if (!deleted) {
      throw new NotFoundException('Committee not found');
    }
    return deleted;
  }
}
