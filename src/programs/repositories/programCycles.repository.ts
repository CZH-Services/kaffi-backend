import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { ProgramCycle } from '../entities/programCycle';

@Injectable()
export class ProgramCyclesRepository {
  constructor(private readonly databaseService: PostgresService) {}

  async addCycle(cycle: ProgramCycle): Promise<boolean> {
    return this.databaseService
      .query(
        'INSERT INTO ProgramCycle("programId", name, active, submission, deadline, results) VALUES($1, $2, $3, $4, $5, $6);',
        [
          cycle.programId,
          cycle.name,
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

  async getCycle(id: number): Promise<ProgramCycle> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCycle WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <ProgramCycle>res.rows[0];
        }
        return undefined;
      });
  }

  async getActiveCycle(programId: number): Promise<ProgramCycle> {
    return this.databaseService
      .query(
        `SELECT * FROM ProgramCycle WHERE active = TRUE and "programId" = $1;`,
        [programId],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return <ProgramCycle>res.rows[0];
        }
        return undefined;
      });
  }

  async getProgramCycles(programId: number): Promise<ProgramCycle[]> {
    return this.databaseService
      .query(`SELECT * FROM ProgramCycle WHERE "programId" = $1;`, [programId])
      .then((res) => {
        if (res.rowCount > 0) {
          return <ProgramCycle[]>res.rows;
        }
        return [];
      });
  }

  async deactivateProgramCycles(programId: number): Promise<boolean> {
    return this.databaseService
      .query(`UPDATE ProgramCycle SET active = FALSE WHERE "programId" = $1;`, [
        programId,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateCycle(newCycle: ProgramCycle): Promise<boolean> {
    return this.databaseService
      .query(
        `UPDATE ProgramCycle SET name = $1, active = $2, submission = $3, deadline = $4, results = $5 WHERE id = $6;`,
        [
          newCycle.name,
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
