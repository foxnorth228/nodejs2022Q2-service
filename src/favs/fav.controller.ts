import { Controller, Get, Post, Put, Delete, HttpCode, Param, Headers} from "@nestjs/common";
import { FavService } from "./services/fav.service";

@Controller('favs')
export class FavController {
    constructor(private favService: FavService) {}

    @Get()
    @HttpCode(200)
    async findAll() {

    }

    @Post('artist/:id')
    @HttpCode(201)
    async addArtist(@Param() params, @Headers() header) {
        return await this.favService.addArtist(params.id, header.host);
    }

    @Delete('artist/:id')
    @HttpCode(204)
    async removeArtist() {

    }

    @Post('artist/:id')
    @HttpCode(201)
    async addAlbum() {

    }

    @Delete('artist/:id')
    @HttpCode(204)
    async removeAlbum() {

    }

    @Post('artist/:id')
    @HttpCode(201)
    async addTrack() {

    }

    @Delete('artist/:id')
    @HttpCode(204)
    async removeTrack() {

    }
}