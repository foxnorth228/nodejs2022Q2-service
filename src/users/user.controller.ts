import { Controller, Get, Post, Put, Delete, Req, Res, Param, HttpStatus, HttpException, Body } from "@nestjs/common";
import { UserService } from "./services/user.service";
import "./dto/create-user.dto";
import { Request, Response} from "express";
import { CreateUserDto } from "./dto/create-user.dto";

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
        switch(user) {
            case null: 
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Not valid id'
                }, HttpStatus.BAD_REQUEST);
            case undefined: 
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: `Can't found this object: ${params.id}`
                }, HttpStatus.NOT_FOUND);
            default:
                res.status(HttpStatus.OK);
                return user;
        }
    }
    @Post() 
    create(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
        res.status(HttpStatus.CREATED);
        return this.userService.create(createUserDto);
    }
    @Put(':id') 
    rewrite() {
        return "login";
    }
    @Delete(':id') 
    deleteUser() {
        return "deleted";
    }
}