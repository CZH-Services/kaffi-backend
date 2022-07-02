import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionServices } from 'src/permissions/permission.services';
import { UsersServices } from 'src/user/users.services';

export const SetPermission = (roleName: string, committeeName: string) =>
  SetMetadata('permission', [roleName, committeeName]);

@Injectable()
export class HasAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userServices: UsersServices,
    private readonly permissionServices: PermissionServices,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext) {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    const role = permission[0];
    const committee = permission[1];

    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization.split(' ')[1];
    const token = this.jwtService.decode(bearer);

    if (!token) {
      return false;
    }

    return this.userServices.findOne(token['email']).then(async (user) => {
      if (!user) {
        return false;
      }

      const hasPermission = await this.permissionServices.getPermission(
        user.id,
        role,
        committee,
      );

      if (!hasPermission) {
        return false;
      }
      return true;
    });
  }
}
