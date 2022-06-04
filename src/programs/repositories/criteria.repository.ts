import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Criterion } from '../entities/criterion';

@Injectable()
export class CriteriaRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCriterion(criterion: Criterion): Promise<boolean> {
    return this.databaseService
      .query(
        `INSERT INTO ProgramCriterion(programId, rank, description) VALUES($1, $2, $3);`,
        [criterion.programId, criterion.rank, criterion.description],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getCriteria(programId: number): Promise<Criterion[]> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCriterion WHERE programId = $1;`, [
        programId,
      ])
      .then((res) => {
        return <Criterion[]>res.rows;
      });
  }

  async getCriterion(id: number): Promise<Criterion> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCriterion WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Criterion>res.rows[0];
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

  async updateCriterion(newCriterion: Criterion): Promise<boolean> {
    return this.databaseService
      .query(
        `UPDATE ProgramCriterion SET rank = $1, description = $2 WHERE id = $3;`,
        [newCriterion.rank, newCriterion.description, newCriterion.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
