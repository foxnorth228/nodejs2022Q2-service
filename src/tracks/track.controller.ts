import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, Request } from "@nestjs/common";
import { TrackService } from "./services/track.service";
import { CreateTrackDto } from "./dto/create-track.dto";

@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Get()
    @HttpCode(200)
    findAll() {
        return this.trackService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param() params) {
        const artist = this.trackService.findOne(params.id);
        return artist;
    }

    @Post()
    @HttpCode(201)
    create(@Body() createArtistDto: CreateTrackDto) {
        return this.trackService.create(createArtistDto);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Body() updateArtistDto: CreateTrackDto, @Param() params) {
        return this.trackService.update(params.id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param() params) {
        this.trackService.delete(params.id);
    }
}