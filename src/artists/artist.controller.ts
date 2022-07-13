import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body } from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { ArtistService } from "./services/artist.service";

@Controller('artist')
export class ArtistController {
    constructor(private artistservice: ArtistService) {}

    @Get()
    @HttpCode(200)
    findAll() {
        return this.artistservice.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param() params) {
        const artist = this.artistservice.findOne(params.id);
        return artist;
    }

    @Post()
    @HttpCode(201)
    create(@Body() createArtistDto: CreateArtistDto) {
        return this.artistservice.create(createArtistDto);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Body() updateArtistDto: CreateArtistDto, @Param() params) {
        return this.artistservice.update(params.id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param() params) {
        this.artistservice.delete(params.id);
    }
}