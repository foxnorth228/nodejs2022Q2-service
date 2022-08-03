import { Injectable } from "@nestjs/common";
import { AuthPrismaService } from "./auth.prisma.service";
import { SignupUserDto } from ".././dtos/signup-user.dto";
import { LoginUserDto } from ".././dtos/login-user.dto";
import { RefreshDto } from ".././dtos/refresh.dto";

@Injectable()
export class AuthService {
    private authPrismaService: AuthPrismaService = new AuthPrismaService();

    async signup(body: SignupUserDto) {
        await this.authPrismaService.createUser(body);
    }

    async login(body: LoginUserDto) {
        await this.authPrismaService.checkUser(body);
    }

    async refresh(body: RefreshDto) {

    }
}
