import { IUser } from "../user.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";

@Injectable()
export class UserPrismaService {
    constructor(private prismaService: PrismaService) {}
    async create(user: IUser): Promise<IUser> {
        const createdUser = await this.prismaService.user.create({
            data: {
                id: user.id,
                login: user.login,
                password: user.password,
                version: user.version,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
        return createdUser;
    }

    async findOne(id: string): Promise<IUser | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    }
    async findAll(): Promise<Array<IUser>> {
        return await this.prismaService.user.findMany({});
    }
}