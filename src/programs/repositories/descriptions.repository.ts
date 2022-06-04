import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProgramDescription } from '../entities/programDescription';

@Injectable()
export class DescriptionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createDescription(description: ProgramDescription): Promise<boolean> {
    return this.databaseService
      .query(
        `INSERT INTO ProgramDescription(programId, rank, description) VALUES($1, $2, $3);`,
        [description.programId, description.rank, description.description],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getDescriptions(programId: number): Promise<ProgramDescription[]> {
    return this.databaseService
      .query(`SELECT * FROM ProgramDescription WHERE programId = $1;`, [
        programId,
      ])
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
}
