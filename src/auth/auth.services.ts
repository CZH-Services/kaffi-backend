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
import { MailService } from 'src/services/MailService';
import { AuthResponse } from './dto/authResponse';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersServices: UsersServices,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createResetPassowrdToken(email: string) {
    email = email.toLowerCase();
    return await this.jwtService.signAsync(
      { email: email },
      { expiresIn: '48h', secret: 'reset-password' },
    );
  }

  async requestResetPassword(email: string) {
    email = email.toLowerCase();
    const user = await this.usersServices.findOne(email);
    if (!user) {
      throw new HttpException({ emailNotFound: true }, HttpStatus.BAD_REQUEST);
    } else if (user.authWithGoogle)
      throw new HttpException({ authWithGoogle: true }, HttpStatus.BAD_REQUEST);

    const token = await this.createResetPassowrdToken(email);
    this.usersServices.updateResetPasswordToken(email, token);
    const env = process.env;
    const link = `<p>Dear ${user.firstName},</p>
      <p>
       You have requested a password reset. Please click on 
       <a href='${env.CLIENT_URL}/reset-password?token=${token}'>this link</a>
       to reset your password.
      </p>
      <br>
      <p>Regards,</p>
      <p>Kaffi Support Team</p>`;
    this.mailService.sendMail(user.email, 'Reset password', link);
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
      throw new HttpException(
        'Invalid token, please request a new reset password link',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.jwtService.decode(token);
    const email = user['email'].toLowerCase();
    const currentToken = await this.usersServices.getUserResetPasswordToken(
      email,
    );
    if (currentToken !== token) {
      throw new HttpException(
        'This link is expired, please request a new reset password link',
        HttpStatus.BAD_REQUEST,
      );
    }

    const changePasswordResponse = await this.usersServices.changePassword(
      email,
      newPassword,
    );
    if (changePasswordResponse) {
      const token = await this.createResetPassowrdToken(email);
      this.usersServices.updateResetPasswordToken(email, token);
      const env = process.env;
      const html = `<p>Hello,</p>
      <p>
       Your password has been changed. If that wasn't you, please go to the following 
       <a href='${env.CLIENT_URL + '/request-reset-password'}'>link</a> 
       and change it back!
      </p>
      <br>
      <p>Regards,</p>
      <p>Kaffi Support Team</p>`;
      this.mailService.sendMail(email, 'Password reset', html);
      return true;
    }
    return false;
  }

  async validateUser(email: string, password: string): Promise<any> {
    email = email.toLowerCase();
    const user = await this.usersServices.findOne(email);
    if (!user) {
      return null;
    }
    if (user.authWithGoogle)
      throw new HttpException({ authWithGoogle: true }, HttpStatus.BAD_REQUEST);
    const isValid =
      user.password && (await this.equalsHash(password, user.password));
    if (!isValid) {
      return null;
    }
    delete user.password;
    return user;
  }

  getJWTToken(email: string, id: number) {
    email = email.toLowerCase();
    const payload = { email: email.toLowerCase(), sub: id };
    return this.jwtService.sign(payload);
  }

  async equalsHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async getTokenAndNameForValidatedUser(info: Login) {
    info.email = info.email.toLowerCase();
    const user = await this.usersServices.findOne(info.email);
    return {
      token: this.getJWTToken(user.email, user.id),
      name: user.firstName,
    };
  }

  async signup(user: SignUp) {
    user.email = user.email.toLowerCase();
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

    const html = `<p>Hello ${user.firstName} ${user.lastName},</p>
      <p>
       Your account has been created successfully!
      </p>
      <br>
      <p>Regards,</p>
      <p>Kaffi Support Team</p>`;
    this.mailService.sendMail(user.email, 'Account created', html);

    return {
      token: this.getJWTToken(createdUser.email, createdUser.id),
      name: createdUser.firstName,
    };
  }

  async googleAuthentication(accessToken: string): Promise<AuthResponse> {
    let { email, given_name, family_name } = await axios
      .get(GET_GOOGLE_USER_INFO_URL(accessToken))
      .then((res) => res.data);
    email = email.toLowerCase();
    let user = <UserResponse>await this.usersServices.findOne(email);

    if (!user) {
      user = <UserResponse>await this.usersServices.createAndGetUser({
        email,
        firstName: given_name,
        lastName: family_name,
        authWithGoogle: true,
        profile: null,
        password: null,
        location: null,
      });
    }
    if (!user.authWithGoogle)
      throw new HttpException(
        { notauthWithGoogle: true },
        HttpStatus.BAD_REQUEST,
      );
    else
      return {
        token: this.getJWTToken(email, user.id),
        name: given_name,
      };
  }
}
