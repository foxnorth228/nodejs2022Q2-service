import { Controller, Get, Post, Put, Delete, Req, Res, Param, HttpStatus, Body } from "@nestjs/common";
import { UserService } from "./services/user.service";
import "./dto/create-user.dto";
import { Request, Response} from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    findAll(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param() params, @Res({passthrough: true}) res: Response) {
        const user = this.userService.findOne(params.id);
        res.status(HttpStatus.OK);
        return user;
    }
    @Post() 
    async create(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
        res.status(HttpStatus.CREATED);
        return await this.userService.create(createUserDto);
    }
    @Put(':id') 
    async rewrite(@Param() params, @Body() updateUserDto: UpdateUserDto, @Res({passthrough: true}) res: Response) {
        res.status(HttpStatus.OK);
        return await this.userService.update(params.id, updateUserDto);
    }
    @Delete(':id') 
    deleteUser(@Param() params, @Res({passthrough: true}) res: Response) {
        this.userService.delete(params.id);
        res.status(HttpStatus.NO_CONTENT);
    }
}