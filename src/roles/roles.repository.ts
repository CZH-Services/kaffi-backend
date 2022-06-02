import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Role } from './entities/role';

@Injectable()
export class RolesRepository {
  constructor(private readonly database: DatabaseService) {}

  async createRole(role: Role): Promise<Role> {
    return this.database
      .query(`INSERT INTO KaffiRole(name) VALUES('${role.name}');`)
      .then(() => {
        return this.database
          .query('SELECT * FROM KaffiRole where name = $1', [role.name])
          .then((res) => {
            return res.rows[0];
          });
      });
  }

  async getRoleByName(name: string): Promise<Role> {
    return this.database
      .query('SELECT * FROM KaffiRole WHERE name = $1', [name])
      .then((res) => {
        if (res.rows.length === 1) {
          return <Role>res.rows[0];
        }
        return undefined;
      });
  }

  async getRoles(): Promise<Role[]> {
    return this.database.query('SELECT * FROM KaffiRole').then((res) => {
      return res.rows.map((role: any) => <Role>role);
    });
  }

  async updateRole(role: Role): Promise<boolean> {
    return this.database
      .query(`UPDATE KaffiRole SET name = '${role.name}' WHERE id = ${role.id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteRole(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM KaffiRole WHERE id = ${id}`)
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
