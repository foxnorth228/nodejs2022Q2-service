import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { SignupUserDto } from "./dtos/signup-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RefreshDto } from "./dtos/refresh.dto";

@Controller('auth') 
export class AuthController {

    private authService: AuthService = new AuthService();

    @Post('signup')
    async signup(@Body() body: SignupUserDto) {
        await this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: LoginUserDto) {
        await this.authService.login(body);
    }

    @Post('refresh') 
    async refresh(@Body() body: RefreshDto) {
        await this.authService.refresh(body);
    }
}