import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { TrackService } from './services/track.service';
import { CreateTrackDto } from './dto/create-track.dto';

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
    return this.trackService.findOne(params.id);
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
  async delete(@Param() params, @Headers() header) {
    await this.trackService.delete(params.id, header.host);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromTracks(@Param() params) {
    return await this.trackService.deleteArtistFromTracks(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromTracks(@Param() params) {
    return await this.trackService.deleteAlbumFromTracks(params.id);
  }
}
