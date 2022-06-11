import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Program } from '../entities/program';

@Injectable()
export class ProgramRepository {
  constructor(private readonly database: DatabaseService) {}

  async createProgram(program: Program): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO Program(name, caption, description, icon, highlights) VALUES($1, $2, $3, $4, $5);`,
        [
          program.name,
          program.caption,
          program.description,
          program.icon,
          program.highlights,
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
    const query =
      'UPDATE Program SET name = $1, caption = $2, description = $3, highlights = $4';
    const queryWithoutIcon = query + 'WHERE id = $5';
    const queryWithIcon = query + ', icon = $6 where id = $5';

    return this.database
      .query(program.icon ? queryWithIcon : queryWithoutIcon, [
        program.name,
        program.caption,
        program.description,
        program.highlights,
        program.id,
        program.icon,
      ])
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
