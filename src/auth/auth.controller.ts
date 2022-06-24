import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthServices } from './auth.services';
import { Login } from './dto/login';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthentication } from './dto/googleAuth';
import { SignUp } from './dto/signup';

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
  async signedInOnlyHello() {
    return 'hello';
  }
}
