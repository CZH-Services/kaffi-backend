import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Permission } from './entities/permission';

@Injectable()
export class PermissionRepository {
  constructor(private readonly database: PostgresService) {}

  async assignPermissionToUser(permission: Permission): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO Permission ("userId", "roleId", "committeeId") VALUES ($1, $2, $3)`,
        [permission.userId, permission.roleId, permission.committeeId],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async revokePermissionFromUser(permissionId: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM Permission WHERE id = $1`, [permissionId])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getPermissions(userId: number): Promise<Permission[]> {
    return this.database
      .query(`SELECT * FROM Permission WHERE "userId" = $1`, [userId])
      .then((res) => {
        return res.rows.map((permission: any) => <Permission>permission);
      });
  }

  async getPermission(
    userId: number,
    roleId: number,
    committeeId: number,
  ): Promise<Permission> {
    return this.database
      .query(
        `SELECT * FROM Permission WHERE "userId" = $1 AND "roleId" = $2 AND "committeeId" = $3`,
        [userId, roleId, committeeId],
      )
      .then((res) => {
        if (res.rowCount > 0) {
          return <Permission>res.rows[0];
        }
        return undefined;
      });
  }

  async getPermissionById(id: number): Promise<Permission> {
    return this.database
      .query(`SELECT * FROM Permission WHERE id = $1`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Permission>res.rows[0];
        }
        return undefined;
      });
  }
}
