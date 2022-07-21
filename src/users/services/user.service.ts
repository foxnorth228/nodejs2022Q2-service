import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserPrismaService } from './user.prisma.service';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';

@Injectable()
export class UserService {
  private userPrismaService: UserPrismaService = new UserPrismaService();

  async create(user: CreateUserDto) {
    const id = await ProcessorId.createId(this.userPrismaService);
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
    ProcessorId.checkValidation(id);
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
    ProcessorId.checkValidation(id);
    const oldUser = await this.userPrismaService.findOne(id);
    if (!oldUser) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    if (oldUser.password !== user.oldPassword) {
      throw new ForbiddenException(
        `Old password "${user.oldPassword} is incorrect`,
      );
    }
    oldUser.password = user.newPassword;
    const updatedUser = await this.userPrismaService.update(id, oldUser);
    const sendUser = Object.assign({}, updatedUser);
    delete sendUser.password;
    return sendUser;
  }

  async delete(id: string) {
    ProcessorId.checkValidation(id);
    const user = await this.userPrismaService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: "${id}" is not exist`);
    }
    await this.userPrismaService.delete(id);
  }
}
