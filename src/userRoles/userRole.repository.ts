import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { UserRole } from './entities/userRole';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly database: PostgresService) {}

  async assignRolePermissionToUser(userRole: UserRole): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO UserRole ("userId", "roleId", "committeeId") VALUES ($1, $2, $3)`[
          (userRole.userId, userRole.roleId, userRole.committeeId)
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async revokeRolePermissionFromUser(userRole: UserRole): Promise<boolean> {
    return this.database
      .query(
        `DELETE FROM UserRole WHERE "userId" = $1 AND "roleId" = $2 AND "committeeId" = $3`,
        [userRole.userId, userRole.roleId, userRole.committeeId],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getUserRoles(userId: number): Promise<UserRole[]> {
    return this.database
      .query(`SELECT * FROM UserRole WHERE "userId" = $1`, [userId])
      .then((res) => {
        return res.rows.map((userRole: any) => <UserRole>userRole);
      });
  }
}
