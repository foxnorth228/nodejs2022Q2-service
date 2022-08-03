import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserPrismaService } from './user.prisma.service';
import { ProcessorId } from '../../../secondaryFuncs/ProcessorId';
import { checkNotFound } from 'src/secondaryFuncs/checkNotFound';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private userPrismaService: UserPrismaService = new UserPrismaService();

  async create(user: CreateUserDto): Promise<IUser> {
    const id: string = await ProcessorId.createId(this.userPrismaService);
    const time: number = new Date().getTime();
    const newUser: IUser = {
      id: id,
      version: 1,
      createdAt: time,
      updatedAt: time,
      login: user.login,
      password: user.password,
    };
    const createdUser: IUser = await this.userPrismaService.create(newUser);
    delete createdUser.password;
    return createdUser;
  }

  async findOne(id: string): Promise<IUser> {
    ProcessorId.checkValidation(id);
    const user: IUser | null = await this.userPrismaService.findOne(id);
    checkNotFound(user, `User with id: "${id}" is not exist`);
    return user;
  }

  async findAll(): Promise<IUser[]> {
    return await this.userPrismaService.findAll();
  }

  async update(id: string, user: UpdateUserDto): Promise<IUser> {
    ProcessorId.checkValidation(id);
    const oldUser: IUser | null = await this.userPrismaService.findOne(id);
    checkNotFound(oldUser, `User with id: "${id}" is not exist`);
    if (oldUser.password !== user.oldPassword) {
      throw new ForbiddenException(
        `Old password "${user.oldPassword} is incorrect`,
      );
    }
    oldUser.password = user.newPassword;
    const updatedUser: IUser = await this.userPrismaService.update(id, oldUser);
    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    ProcessorId.checkValidation(id);
    const user: IUser | null = await this.userPrismaService.findOne(id);
    checkNotFound(user, `User with id: "${id}" is not exist`);
    await this.userPrismaService.delete(id);
  }
}
