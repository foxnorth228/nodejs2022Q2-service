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
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './services/track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  create(@Body() createArtistDto: CreateTrackDto) {
    return this.trackService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateArtistDto: CreateTrackDto) {
    return this.trackService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
    @Headers('host') host: string,
    @Headers() header,
  ) {
    await this.trackService.delete(id, host, header);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async deleteArtistFromTracks(@Param('id') id: string) {
    return await this.trackService.deleteArtistFromTracks(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async deleteAlbumFromTracks(@Param('id') id: string) {
    return await this.trackService.deleteAlbumFromTracks(id);
  }
}
