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
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateTrackDto) {
    return this.trackService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  update( @Param('id') id: string, @Body() updateArtistDto: CreateTrackDto) {
    return this.trackService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @Headers('host') host: string) {
    await this.trackService.delete(id, host);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromTracks(@Param('id') id: string) {
    return await this.trackService.deleteArtistFromTracks(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromTracks(@Param('id') id: string) {
    return await this.trackService.deleteAlbumFromTracks(id);
  }
}
