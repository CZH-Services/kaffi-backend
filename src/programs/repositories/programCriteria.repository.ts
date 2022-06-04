import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProgramCriterion } from '../entities/programCriterion';

@Injectable()
export class ProgramCriteriaRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCriterion(criterion: ProgramCriterion): Promise<boolean> {
    return this.databaseService
      .query(
        `INSERT INTO ProgramCriterion("programId", rank, description) VALUES($1, $2, $3);`,
        [criterion.programId, criterion.rank, criterion.description],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getProgramCriteria(programId: number): Promise<ProgramCriterion[]> {
    return this.databaseService
      .query(
        `SELECT * FROM ProgramCriterion WHERE "programId" = $1 ORDER BY rank;`,
        [programId],
      )
      .then((res) => {
        return <ProgramCriterion[]>res.rows;
      });
  }

  async getCriterion(id: number): Promise<ProgramCriterion> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCriterion WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <ProgramCriterion>res.rows[0];
        }
        return undefined;
      });
  }

  async deleteCriterion(id: number): Promise<boolean> {
    return this.databaseService
      .query(`DELETE FROM ProgramCriterion WHERE id = $1;`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateCriterion(newCriterion: ProgramCriterion): Promise<boolean> {
    return this.databaseService
      .query(
        `UPDATE ProgramCriterion SET rank = $1, description = $2 WHERE id = $3;`,
        [newCriterion.rank, newCriterion.description, newCriterion.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateProgramCriteriaRanks(
    programId: number,
    minRank: number,
    maxRank: number,
    increment: boolean,
  ) {
    return this.databaseService.query(
      `UPDATE ProgramCriterion SET rank = rank ${
        increment ? '+' : '-'
      } 1 WHERE "programId" = $1 AND rank >= $2 AND rank <= $3;`,
      [programId, minRank, maxRank],
    );
  }

  async getHighestProgramCriterionRank(programId: number): Promise<number> {
    return this.databaseService
      .query(`SELECT MAX(rank) FROM ProgramCriterion WHERE "programId" = $1;`, [
        programId,
      ])
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0].max;
        }
        return undefined;
      });
  }
}
