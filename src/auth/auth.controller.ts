import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthServices } from './auth.services';
import { Login } from './dto/login';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() credentials: Login, @Request() request) {
    return this.authServices.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() request) {
    return request.user;
  }
}