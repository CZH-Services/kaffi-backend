import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { ProgramDescription } from '../entities/programDescription';

@Injectable()
export class ProgramDescriptionRepository {
  constructor(private readonly databaseService: PostgresService) {}

  async createDescription(description: ProgramDescription): Promise<boolean> {
    return this.databaseService
      .query(
        `INSERT INTO ProgramDescription("programId", rank, description) VALUES($1, $2, $3);`,
        [description.programId, description.rank, description.description],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getProgramDescriptions(
    programId: number,
  ): Promise<ProgramDescription[]> {
    return this.databaseService
      .query(
        `SELECT * FROM ProgramDescription WHERE "programId" = $1 ORDER BY rank;`,
        [programId],
      )
      .then((res) => {
        return <ProgramDescription[]>res.rows;
      });
  }

  async getDescription(id: number): Promise<ProgramDescription> {
    return this.databaseService
      .query(`SELECT * FROM ProgramDescription WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <ProgramDescription>res.rows[0];
        }
        return undefined;
      });
  }

  async deleteDescription(id: number) {
    return this.databaseService
      .query(`DELETE FROM ProgramDescription WHERE id = $1;`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async decreaseProgramDescriptionRanks(programId: number, rank: number) {
    return this.databaseService.query(
      `UPDATE ProgramDescription SET rank = rank - 1 WHERE "programId" = $1 AND rank >= $2;`,
      [programId, rank],
    );
  }

  async updateDescription(newDescription: ProgramDescription) {
    return this.databaseService
      .query(
        `UPDATE ProgramDescription SET rank = $1, description = $2 WHERE id = $3;`,
        [newDescription.rank, newDescription.description, newDescription.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateProgramDescriptionsRanks(
    programId: number,
    minRank: number,
    maxRank: number,
    increment: boolean,
  ) {
    return this.databaseService.query(
      `UPDATE ProgramDescription SET rank = rank ${
        increment ? '+' : '-'
      } 1 WHERE "programId" = $1 AND rank >= $2 AND rank <= $3;`,
      [programId, minRank, maxRank],
    );
  }

  async getHighestProgramDescriptionRank(programId: number): Promise<number> {
    return this.databaseService
      .query(
        `SELECT MAX(rank) as max FROM ProgramDescription WHERE "programId" = $1;`,
        [programId],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0].max;
        }
        return undefined;
      });
  }
}
