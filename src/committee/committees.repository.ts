import { Injectable, Scope } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Committee } from './entities/committee';

@Injectable()
export class CommitteesRepository {
  constructor(private readonly database: PostgresService) {}

  async createCommittee(committee: Committee): Promise<Committee> {
    return this.database
      .query(`INSERT INTO Committee(name) VALUES('${committee.name}');`)
      .then(() => {
        return this.database
          .query('SELECT * FROM Committee where name = $1', [committee.name])
          .then((res) => {
            return res.rows[0];
          });
      });
  }

  async getCommitteeByName(name: string): Promise<Committee> {
    return this.database
      .query('SELECT * FROM Committee WHERE name = $1', [name])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Committee>res.rows[0];
        }
        return undefined;
      });
  }

  async getCommittees(): Promise<Committee[]> {
    return this.database.query('SELECT * FROM Committee').then((res) => {
      return res.rows.map((committee: any) => <Committee>committee);
    });
  }

  async getCommitteeById(id: number): Promise<Committee> {
    return this.database
      .query(`SELECT * FROM Committee WHERE id = ${id}`)
      .then((res) => {
        if (res.rowCount > 0) {
          return <Committee>res.rows[0];
        }
        return undefined;
      });
  }

  async updateCommittee(committee: Committee): Promise<boolean> {
    return this.database
      .query(
        `UPDATE Committee SET name = '${committee.name}' WHERE id = ${committee.id}`,
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteCommittee(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM Committee WHERE id = ${id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
