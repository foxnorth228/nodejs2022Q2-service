import { IUser } from "src/modules/users/interfaces/user.interface";
import { PrismaService } from "src/prisma/prisma";
import { LoginUserDto } from ".././dtos/login-user.dto";

export class AuthPrismaService {
    private prismaService: PrismaService = new PrismaService();

    async createUser(user: IUser): Promise<IUser | null> {
        const newUser = await this.prismaService.user.create({
            data: {
                id: user.id,
                version: user.version,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                login: user.login,
                password: user.password,
            }
        })
        return newUser;
    }

    async checkUser(user: LoginUserDto): Promise<IUser | null> {
        const checkUser = await this.prismaService.user.findFirst({
            where: {
                login: user.login,
            }
        })
        return checkUser;
    }

    async findOne(id: string): Promise<IUser | null> {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: id,
          },
        });
        return user;
      }
}