import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";

@Controller('auth') 
export class AuthController {

    private authService: AuthService = new AuthService();
    
    @Post('signup')
    signup() {

    }

    @Post('login')
    login() {

    }

    @Post('refresh') 
    refresh() {

    }
}