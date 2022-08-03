import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { SignupUserDto } from "./dtos/signup-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RefreshDto } from "./dtos/refresh.dto";

@Controller('auth') 
export class AuthController {

    private authService: AuthService = new AuthService();

    @HttpCode(201)
    @Post('signup')
    async signup(@Body() body: SignupUserDto) {
        await this.authService.signup(body);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() body: LoginUserDto) {
        await this.authService.login(body);
    }

    @HttpCode(200)
    @Post('refresh') 
    async refresh(@Body() body: RefreshDto) {
        await this.authService.refresh(body);
    }
}