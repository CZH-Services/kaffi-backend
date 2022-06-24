import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from 'src/user/users.services';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { UserResponse } from 'src/user/dto/userResponse';
import { CreateUser } from 'src/user/dto/createUser';
import { SignUp } from './dto/signup';
import { Login } from './dto/login';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersServices: UsersServices,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersServices.findOne(email);
    if (!user) {
      return null;
    }
    const isValid = await this.equalsHash(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }

  async getJWTToken(email: string, id: number) {
    const payload = { email: email, sub: id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async equalsHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async getTokenForValidatedUser(info: Login) {
    const user = await this.usersServices.findOne(info.email);
    return this.getJWTToken(user.email, user.id);
  }

  async signup(user: SignUp) {
    if (await this.usersServices.findOne(user.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;
    let createdUser = <UserResponse>await this.usersServices.createAndGetUser({
      ...user,
      authWithGoogle: false,
      profile: null,
      location: null,
    });

    return this.getJWTToken(createdUser.email, createdUser.id);
  }

  async googleAuthentication(accessToken: string) {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`;
    const { email, given_name, family_name, picture } = await axios
      .get(url)
      .then((res) => res.data);


    let user = <UserResponse>await this.usersServices.findOne(email);

    if (!user) {
      user = <UserResponse>await this.usersServices.createAndGetUser({
        email,
        firstName: given_name,
        lastName: family_name,
        authWithGoogle: true,
        profile: picture,
        password: null,
        location: null,
      });
    }

    return this.getJWTToken(email, user.id);
  }
}
