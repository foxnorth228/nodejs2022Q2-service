import { Injectable } from "@nestjs/common";
import { AuthPrismaService } from "./auth.prisma.service";
import { SignupUserDto } from ".././dtos/signup-user.dto";
import { LoginUserDto } from ".././dtos/login-user.dto";
import { RefreshDto } from ".././dtos/refresh.dto";

@Injectable()
export class AuthService {
    private authPrismaService: AuthPrismaService = new AuthPrismaService();

    async signup(body: SignupUserDto) {

    }

    async login(body: LoginUserDto) {

    }

    async refresh(body: RefreshDto) {
        
    }
}
