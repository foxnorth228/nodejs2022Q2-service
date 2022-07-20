import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUser } from '../user.interface';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma';
import { UserPrismaService } from "./user.prisma.servise";

const checkValidation = (id) => {
  if (!validate(id)) {
    throw new BadRequestException(`This id: "${id}" is not valid`);
  }
};

@Injectable()
export class UserService {
  constructor(private userPrismaService: UserPrismaService, private prismaClient: PrismaService) {};
  private readonly users: IUser[] = [];

  async create(user: CreateUserDto) {
    const newUser = Object.assign(
      {
        id: v4(),
        version: 1,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
      user,
    );
    const createdUser = await this.userPrismaService.create(newUser);
    const sendUser = Object.assign({}, createdUser);
    delete sendUser.password;
    return sendUser;
  }

  async findOne(id: string) {
    checkValidation(id);
    const user = await this.userPrismaService.findOne(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
  }

  async findAll() {
    return await this.userPrismaService.findAll();
  }

  async update(id: string, user: UpdateUserDto) {
    checkValidation(id);
    const oldUser = this.users.find((el) => el.id === id);
    const oldUser2 = await this.prismaClient.user.findUnique({
      where: {
        id: id,
      },
    })
    if (!oldUser2) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    if (oldUser2.password !== user.oldPassword) {
      throw new ForbiddenException(
        `Old password "${user.oldPassword} is incorrect`,
      );
    }
    oldUser.password = user.newPassword;
    oldUser.version += 1;
    oldUser.updatedAt = new Date().getTime();
    const sendUser2 = await this.prismaClient.user.update({
      where: {
        id: id,
      }, 
      data: {
        password: user.newPassword,
        version: oldUser2.version + 1,
        updatedAt: new Date().getTime(),
      },
    })
    const sendUser = Object.assign({}, oldUser);
    delete sendUser2.password;
    return sendUser2;
  }

  async delete(id: string) {
    checkValidation(id);
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: id,
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    console.log("user", user);
    const a = await this.prismaClient.user.delete({
      where: {
        id: id,
      },
    });
  }
}
