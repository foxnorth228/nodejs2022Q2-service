import { Injectable } from "@nestjs/common";
import { AuthPrismaService } from "./auth.prisma.service";
import { SignupUserDto } from ".././dtos/signup-user.dto";
import { LoginUserDto } from ".././dtos/login-user.dto";
import { ProcessorId } from "src/secondaryFuncs/ProcessorId";
import { RefreshDto } from ".././dtos/refresh.dto";
import { IUser } from "src/modules/users/interfaces/user.interface";

@Injectable()
export class AuthService {
    private authPrismaService: AuthPrismaService = new AuthPrismaService();

    async signup(body: SignupUserDto) {
        const id: string = await ProcessorId.createId(this.authPrismaService);
        const time: number = new Date().getTime();
        const user: IUser = {
            id: id,
            version: 1,
            createdAt: time,
            updatedAt: time,
            login: body.login,
            password: body.password,
          };
        await this.authPrismaService.createUser(user);
    }

    async login(body: LoginUserDto) {
        await this.authPrismaService.checkUser(body);
    }

    async refresh(body: RefreshDto) {

    }
}
