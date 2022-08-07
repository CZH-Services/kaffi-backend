import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionServices } from 'src/permissions/permission.services';
import { UsersServices } from 'src/user/services/users.services';
import { Role } from '../roles/entities/role';
import { Committee } from 'src/committee/entities/committee';
import { firstPermissionIsEquivalientToSecond } from 'src/services/PermissionsHelpers';

@Injectable()
export class CanAssignOrRevokePermission implements CanActivate {
  constructor(
    private readonly userServices: UsersServices,
    private readonly permissionServices: PermissionServices,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization.split(' ')[1];
    const unsignedToken = this.jwtService.decode(bearer);
    const permissionToAssignOrRevoke = request.params.id
      ? await this.permissionServices.getPermissionById(request.params.id)
      : {
          role: request.body.role,
          committee: request.body.committee,
        };

    if (!unsignedToken) return false;

    const user = await this.userServices.findOne(
      unsignedToken['email'].toLowerCase(),
    );

    if (!user) return false;

    const userPermissions = await this.permissionServices.getPermissionsByEmail(
      unsignedToken['email'].toLowerCase(),
    );

    return (
      userPermissions.some((permission) => permission.role === Role.ADMIN) ||
      (userPermissions.some((permission) => {
        return firstPermissionIsEquivalientToSecond(permission, {
          role: Role.MEMBER,
          committee: Committee.ADVISING,
        });
      }) &&
        firstPermissionIsEquivalientToSecond(permissionToAssignOrRevoke, {
          role: Role.STUDENT,
          committee: Committee.ADVISING,
        })) ||
      (userPermissions.some((permission) => {
        return firstPermissionIsEquivalientToSecond(permission, {
          role: Role.MEMBER,
          committee: Committee.SCHOLARSHIP,
        });
      }) &&
        firstPermissionIsEquivalientToSecond(permissionToAssignOrRevoke, {
          role: Role.STUDENT,
          committee: Committee.SCHOLARSHIP,
        }))
    );
  }
}
