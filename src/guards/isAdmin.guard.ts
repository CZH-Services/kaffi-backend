import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionServices } from 'src/permissions/permission.services';
import { UsersServices } from 'src/user/services/users.services';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private readonly userServices: UsersServices,
    private readonly permissionServices: PermissionServices,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext) {
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
        return await this.permissionServices.isAdmin(user.id);
      });
  }
}
