import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from 'src/user/services/users.services';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { UserResponse } from 'src/user/dto/userResponse';
import { SignUp } from './dto/signup';
import { Login } from './dto/login';
import { GET_GOOGLE_USER_INFO_URL } from 'src/constants';
import { hashString } from 'src/services/HashString';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersServices: UsersServices,
    private readonly jwtService: JwtService,
  ) {}

  async requestResetPassword(email: string) {
    const user = await this.usersServices.findOne(email);
    if (user) {
      const token = await this.jwtService.signAsync(
        { email },
        { expiresIn: '48h', secret: 'reset-password' },
      );
      // TODO: create an email service and send the email
      // At the moment we will only print it on the console
      // Also, make sure that the following goes well with our kaffi routes
      console.log(`Token: localhost:3001/reset-password?token=${token}`);
    }
    return true;
  }

  async verifyResetPasswordToken(token: string) {
    try {
      const isValid = await this.jwtService.verify(token, {
        secret: 'reset-password',
      });
      return isValid !== undefined;
    } catch (error) {
      return false;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    if (!this.verifyResetPasswordToken(token)) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const user = this.jwtService.decode(token);
    return this.usersServices.changePassword(user['email'], newPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersServices.findOne(email);
    if (!user) {
      return null;
    }
    const isValid = await this.equalsHash(password, user.password);
    if (!isValid) {
      return null;
    }
    delete user.password;
    return user;
  }

  async getJWTToken(email: string, id: number) {
    const payload = { email: email, sub: id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
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
      throw new HttpException({ emailTaken: true }, HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await hashString(user.password);
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
    const { email, given_name, family_name, picture } = await axios
      .get(GET_GOOGLE_USER_INFO_URL(accessToken))
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
