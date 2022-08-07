import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignupUserDto } from './dtos/signup-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('auth')
export class AuthController {
  private authService: AuthService = new AuthService();

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() body: SignupUserDto) {
    return await this.authService.signup(body);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }

  @HttpCode(200)
  @Post('refresh')
  @UseGuards(AuthGuard)
  async refresh(@Body() body: RefreshDto) {
    return await this.authService.refresh(body);
  }

  @HttpCode(200)
  @Post('verify')
  async verify(@Body() body: VerifyTokenDto) {
    return await this.authService.verify(body);
  }
}
