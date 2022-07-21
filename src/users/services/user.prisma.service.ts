import { IUser } from '../interfaces/user.interface';
import { PrismaService } from '../../prisma/prisma';
import { TemplatePrismaService } from '../../secondaryFuncs/TemplatePrismaService';

export class UserPrismaService extends TemplatePrismaService<IUser> {
  private prismaService: PrismaService = new PrismaService();

  async create(user: IUser): Promise<IUser> {
    const createdUser = await this.prismaService.user.create({
      data: {
        id: user.id,
        login: user.login,
        password: user.password,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
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

  async update(id: string, oldUser: IUser): Promise<IUser> {
    const user = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: oldUser.password,
        version: oldUser.version + 1,
        updatedAt: new Date().getTime(),
      },
    });
    return user;
  }

  async delete(id: string) {
    await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
