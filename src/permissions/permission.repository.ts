import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Role } from 'src/roles/entities/role';
import { Permission } from './entities/permission';

@Injectable()
export class PermissionRepository {
  constructor(private readonly database: PostgresService) {}

  async assignPermissionToUser(permission: Permission): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO Permission ("userId", role, committee, "isCommitteeHead") VALUES ($1, $2, $3, $4)`,
        [
          permission.userId,
          permission.role,
          permission.committee,
          permission.isCommitteeHead,
        ],
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
    role: string,
    committee: string,
  ): Promise<Permission> {
    return this.database
      .query(
        `SELECT * FROM Permission WHERE "userId" = $1 AND role = $2 AND committee = $3`,
        [userId, role, committee],
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

  async isAdmin(userId: number): Promise<boolean> {
    return this.database
      .query(
        `SELECT * FROM Permission WHERE "userId" = $1 AND role = '${Role.ADMIN}'`,
        [userId],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteUserStaffRoles(
    userId: number,
    roles: string[],
  ): Promise<boolean> {
    return this.database
      .query(
        `DELETE FROM Permission WHERE "userId" = $1 AND role = ANY($2::text[])`,
        [userId, roles],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
