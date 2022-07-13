import { Controller, Get, Post, Put, Delete, Req, Res, Param, HttpStatus, Body, HttpCode } from "@nestjs/common";
import { UserService } from "./services/user.service";
import "./dto/create-user.dto";
import { Request, Response} from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(200)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param() params) {
        return this.userService.findOne(params.id);
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
    deleteUser(@Param() params) {
        this.userService.delete(params.id);
    }
}