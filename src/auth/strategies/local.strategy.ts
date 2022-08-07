import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServices } from '../auth.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authServices: AuthServices) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authServices.validateUser(
      email.toLowerCase(),
      password,
    );
    if (!user) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
    return user;
  }
}
