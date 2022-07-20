import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { validate } from 'uuid';
import { UserPrismaService } from "./user.prisma.service";
import { createId } from '../../createId';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException(`This id: "${id}" is not valid`);
  }
};

@Injectable()
export class UserService {
  constructor(private userPrismaService: UserPrismaService) {};

  async create(user: CreateUserDto) {
    const id = await createId(this.userPrismaService, "findOne");
    const newUser = Object.assign(
      {
        id: id,
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
    if (!user) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    return user;
  }

  async findAll() {
    return await this.userPrismaService.findAll();
  }

  async update(id: string, user: UpdateUserDto) {
    checkValidation(id);
    const oldUser = await this.userPrismaService.findOne(id);
    if (!oldUser) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    if (oldUser.password !== user.oldPassword) {
      throw new ForbiddenException(`Old password "${user.oldPassword} is incorrect`);
    }
    oldUser.password = user.newPassword;
    const updatedUser = await this.userPrismaService.update(id, oldUser);
    const sendUser = Object.assign({}, updatedUser);
    delete sendUser.password;
    return sendUser;
  }

  async delete(id: string) {
    checkValidation(id);
    const user = await this.userPrismaService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    await this.userPrismaService.delete(id);
  }
}