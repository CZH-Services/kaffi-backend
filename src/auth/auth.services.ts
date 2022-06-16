import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from 'src/user/users.services';
import axios from 'axios';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersServices: UsersServices,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersServices.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async createUser(user: any) {
    return { email: user.email, id: 123 };
  }

  async googleAuthentication(accessToken: string) {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
    const { email, given_name, family_name, profile, name } = await axios
      .get(url)
      .then((res) => res.data);

    let user = await this.usersServices.findOne(email);

    if (!user) {
      user = await this.createUser({
        email,
        givenName: given_name,
        familyName: family_name,
        name: name,
      });
    }

    return await this.login(user);
  }
}
