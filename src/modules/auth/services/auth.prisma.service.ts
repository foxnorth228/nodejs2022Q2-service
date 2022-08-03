import { IUser } from "src/modules/users/interfaces/user.interface";
import { PrismaService } from "src/prisma/prisma";
import { SignupUserDto } from ".././dtos/signup-user.dto";
import { LoginUserDto } from ".././dtos/login-user.dto";

export class AuthPrismaService {
    private prismaService: PrismaService = new PrismaService();

    async createUser(user: SignupUserDto) {
        /*const newUser = await this.prismaService.user.create({
            where: {

            },
            data: {
                login: user.login,
                password: user.password,
            }
        })*/
    }

    async checkUser(user: LoginUserDto): Promise<IUser | null> {
        const checkUser = await this.prismaService.user.findFirst({
            where: {
                login: user.login,
            }
        })
        return checkUser;
    }
}