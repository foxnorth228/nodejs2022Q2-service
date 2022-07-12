import { Controller, Get, Post, Put, Delete,  Req, Param } from "@nestjs/common";
import { Request} from "express";

@Controller('favs')
export class FavsController {
    @Get()
    findAll(@Req() req: Request) {
        return "xxxx";
    }
    @Post('track/:id') 
    addTrackToFavourites() {
        return "login";
    }
    @Delete('track/:id') 
    removeTrackFromFavourites() {
        return "deleted";
    }
    @Post('artist/:id') 
    addArtistToFavourites() {
        return "login";
    }
    @Delete('artist/:id') 
    removeArtistFromFavourites() {
        return "deleted";
    }
    @Post('album/:id') 
    addAlbumToFavourites() {
        return "login";
    }
    @Delete('album/:id') 
    removeAlbumFromFavourites() {
        return "deleted";
    }
}