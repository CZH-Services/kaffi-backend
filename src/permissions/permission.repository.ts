import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Permission } from './entities/permission';

@Injectable()
export class PermissionRepository {
  constructor(private readonly database: PostgresService) {}

  async assignPermissionToUser(permission: Permission): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO Permission ("userId", "roleId", "committeeId") VALUES ($1, $2, $3)`[
          (permission.userId, permission.roleId, permission.committeeId)
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async revokePermissionFromUser(permission: Permission): Promise<boolean> {
    return this.database
      .query(
        `DELETE FROM Permission WHERE "userId" = $1 AND "roleId" = $2 AND "committeeId" = $3`,
        [permission.userId, permission.roleId, permission.committeeId],
      )
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
}
