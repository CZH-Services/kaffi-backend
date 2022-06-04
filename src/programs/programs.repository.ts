import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Program } from './entities/program';

@Injectable()
export class ProgramRepository {
  constructor(private readonly database: DatabaseService) {}

  async createProgram(program: Program): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO Program(name, description, icon, highlights, criteriaDescription) VALUES($1, $2, $3, $4, $5);`,
        [
          program.name,
          program.description,
          program.icon,
          program.highlights,
          program.criteriaDescription,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getProgram(id: number): Promise<Program> {
    return this.database
      .query(`SELECT * FROM Program WHERE id = $1;`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Program>res.rows[0];
        }
        return undefined;
      });
  }

  async updateProgram(program: Program): Promise<boolean> {
    return this.database
      .query(
        `UPDATE Program SET name = $1, description = $2, icon = $3, highlights = $4, criteriaDescription = $5 WHERE id = $6;`,
        [
          program.name,
          program.description,
          program.icon,
          program.highlights,
          program.criteriaDescription,
          program.id,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteProgram(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM Program WHERE id = $1;`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getPrograms(): Promise<Program[]> {
    return this.database.query(`SELECT * FROM Program;`).then((res) => {
      return <Program[]>res.rows;
    });
  }
}
