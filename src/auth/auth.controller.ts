import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthServices } from './auth.services';
import { Login } from './dto/login';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthentication } from './dto/googleAuth';
import { SignUp } from './dto/signup';
import { RequestResetPassword } from './dto/requestResetPassword';
import { VerifyResetPasswordToken } from './dto/verifyResetPasswordToken';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() credentials: Login, @Request() request) {
    return this.authServices.getTokenForValidatedUser(credentials);
  }

  @Post('signup')
  async signup(@Body() data: SignUp) {
    return this.authServices.signup(data);
  }

  @Post('google-authentication')
  googleAuthRedirect(@Body() body: GoogleAuthentication) {
    return this.authServices.googleAuthentication(body.accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('hello')
  async signedInOnlyHello(@Request() req: any) {
    return req.user;
  }

  @Post('request-reset-password')
  @ApiResponse({
    status: 200,
    description: 'Reset password link sent to email',
  })
  async requestResetPassword(@Body() body: RequestResetPassword) {
    return await this.authServices.requestResetPassword(body.email);
  }

  @Post('verify-reset-password-token')
  @ApiResponse({
    status: 200,
    description: 'Reset password token is valid',
  })
  async verifyResetPasswordToken(@Body() body: VerifyResetPasswordToken) {
    return this.authServices.verifyResetPasswordToken(body.token);
  }
}
