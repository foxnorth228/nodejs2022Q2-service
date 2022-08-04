import "dotenv/config";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { AuthPrismaService } from "./auth.prisma.service";
import { SignupUserDto } from ".././dtos/signup-user.dto";
import { LoginUserDto } from ".././dtos/login-user.dto";
import { ProcessorId } from "src/secondaryFuncs/ProcessorId";
import { RefreshDto } from ".././dtos/refresh.dto";
import { IUser } from "src/modules/users/interfaces/user.interface";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";

@Injectable()
export class AuthService {
    private authPrismaService: AuthPrismaService = new AuthPrismaService();
    private jwtService: JwtService = new JwtService();
    async signup(body: SignupUserDto) {
        const id: string = await ProcessorId.createId(this.authPrismaService);
        const time: number = new Date().getTime();
        const user: IUser = {
            id: id,
            version: 1,
            createdAt: time,
            updatedAt: time,
            login: body.login,
            password: await hash(body.password, process.env.CRYPT_SALT),
          };
        await this.authPrismaService.createUser(user);
    }

    async login(body: LoginUserDto): Promise<{accessToken: string, refreshToken: string}> {
        const user = await this.authPrismaService.checkUser(body);
        if (!user){
            throw new ForbiddenException(`User with this login: ${user.login} doesn't exist`);
        } 
        if (!(await compare(user.password, body.password))) {
            throw new ForbiddenException("You send wrong password");
        }
        return {
            accessToken: await this.jwtService.signAsync(
                {
                    userId: user.id,
                    login: user.login,
                },
                {
                    expiresIn: process.env.TOKEN_EXPIRE_TIME,
                    secret: process.env.JWT_SECRET_KEY
                }
            ),
            refreshToken: await this.jwtService.signAsync(
                {
                userId: user.id,
                login: user.login,
                },
                {
                    expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
                    secret: process.env.JWT_SECRET_REFRESH_KEY
                }
            ),
        }
    }

    async refresh(body: RefreshDto) {
        
    }
}
