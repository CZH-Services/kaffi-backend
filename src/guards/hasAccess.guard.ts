import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionServices } from 'src/permissions/permission.services';
import { UsersServices } from 'src/user/services/users.services';

export const SetPermission = (
  permissions: { role: string; committee: string | null }[],
) => SetMetadata('permissions', permissions);

@Injectable()
export class HasAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userServices: UsersServices,
    private readonly permissionServices: PermissionServices,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get<any>(
      'permissions',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization.split(' ')[1];
    const token = this.jwtService.decode(bearer);

    if (!token) {
      return false;
    }

    return this.userServices
      .findOne(token['email'].toLowerCase())
      .then(async (user) => {
        if (!user) {
          return false;
        }

        const checks = await Promise.all(
          permissions.map(
            async (permission: { role: string; committee: string | null }) => {
              return this.permissionServices.getPermission(
                user.id,
                permission.role,
                permission.committee,
              );
            },
          ),
        );

        const hasPermission = checks.some((check) => check !== undefined);
        return hasPermission;
      });
  }
}
