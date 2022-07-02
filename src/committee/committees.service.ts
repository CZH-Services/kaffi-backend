import { Injectable } from '@nestjs/common';
import { Committee } from './entities/committee';

@Injectable()
export class CommitteesServices {
  constructor() {}

  getCommittees(): string[] {
    return Object.values(Committee);
  }

  getCommitteeByName(committee: string): boolean {
    return Object.values(Committee).includes(<Committee>committee);
  }
}
