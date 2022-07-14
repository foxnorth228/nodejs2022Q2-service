import { Controller, Get, Post, Put, Delete, HttpCode, Param, Headers} from "@nestjs/common";
import { FavService } from "./services/fav.service";

@Controller('favs')
export class FavController {
    constructor(private favService: FavService) {}

    @Get()
    @HttpCode(200)
    async findAll(@Headers() header) {
        return await this.favService.getAllFavs(header.host);
    }

    @Post('artist/:id')
    @HttpCode(201)
    async addArtist(@Param() params, @Headers() header) {
        return await this.favService.addArtist(params.id, header.host);
    }

    @Delete('artist/:id')
    @HttpCode(204)
    async removeArtist(@Param() params) {
        return await this.favService.removeArtist(params.id);
    }

    @Post('album/:id')
    @HttpCode(201)
    async addAlbum(@Param() params, @Headers() header) {
        return await this.favService.addAlbum(params.id, header.host);
    }

    @Delete('album/:id')
    @HttpCode(204)
    async removeAlbum(@Param() params) {
        return await this.favService.removeAlbum(params.id);
    }

    @Post('track/:id')
    @HttpCode(201)
    async addTrack(@Param() params, @Headers() header) {
        return await this.favService.addTrack(params.id, header.host);
    }

    @Delete('track/:id')
    @HttpCode(204)
    async removeTrack(@Param() params) {
        return await this.favService.removeTrack(params.id);
    }
}