import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServices } from '../auth.services';

// represent the strategy passport, the one here is the normal authentication by email and password
// later on, we will add another strategy which is a gmail strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authServices: AuthServices) {
    super({
      usernameField: 'email', // Passport local uses usernames by default, but we want to use emails
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authServices.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
    return user;
  }
}
