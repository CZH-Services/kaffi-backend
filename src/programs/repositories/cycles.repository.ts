import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Cycle } from '../entities/cycle';

@Injectable()
export class CyclesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addCycle(cycle: Cycle): Promise<boolean> {
    return this.databaseService
      .query(
        'INSERT INTO ProgramCycle(programId, active, submission, deadline, results) VALUES($1, $2, $3, $4, $5);',
        [
          cycle.programId,
          cycle.active,
          cycle.submission,
          cycle.deadline,
          cycle.results,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getCycle(id: number): Promise<Cycle> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCycle WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Cycle>res.rows[0];
        }
        return undefined;
      });
  }

  async getActiveCycle(programId: number): Promise<Cycle> {
    return this.databaseService
      .query(
        `SELECT * FROM ProgramCycle WHERE active = TRUE and programId = $1;`,
        [programId],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return <Cycle>res.rows[0];
        }
        return undefined;
      });
  }

  async getProgramCycles(programId: number): Promise<Cycle[]> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCycle WHERE programId = $1;`, [programId])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Cycle[]>res.rows;
        }
        return undefined;
      });
  }

  async deactivateProgramCycles(programId: number): Promise<boolean> {
    return this.databaseService
      .query(`UPDATE ProgramCycle SET active = FALSE WHERE programId = $1;`, [
        programId,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateCycle(newCycle: Cycle): Promise<boolean> {
    return this.databaseService
      .query(
        `UPDATE ProgramCycle SET active = $1, submission = $2, deadline = $3, results = $4 WHERE id = $5;`,
        [
          newCycle.active,
          newCycle.submission,
          newCycle.deadline,
          newCycle.results,
          newCycle.id,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteCycle(id: number): Promise<boolean> {
    return this.databaseService
      .query(`DELETE FROM ProgramCycle WHERE id = $1;`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
