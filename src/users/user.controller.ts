import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import './dto/create-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() params) {
    return await this.userService.findOne(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  async rewrite(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params) {
    await this.userService.delete(params.id);
  }
}
