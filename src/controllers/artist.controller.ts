import { Controller, Get, Post, Put, Delete,  Req, Param } from "@nestjs/common";
import { Request} from "express";

@Controller('artist')
export class ArtistController {
    @Get()
    findAll(@Req() req: Request) {
        return "xxxx";
    }
    @Get(':id')
    findOne(@Param() params) {
        return `${params.id}`
    }
    @Post() 
    register() {
        return "login";
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