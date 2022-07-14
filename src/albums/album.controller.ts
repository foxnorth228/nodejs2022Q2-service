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
import { AlbumService } from './services/album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumServise: AlbumService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumServise.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() params) {
    const artist = this.albumServise.findOne(params.id);
    return artist;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateAlbumDto) {
    return this.albumServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Body() updateArtistDto: CreateAlbumDto, @Param() params) {
    return this.albumServise.update(params.id, updateArtistDto);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromAlbums(@Param() params) {
    this.albumServise.deleteArtistFromAlbums(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params, @Headers() header) {
    await this.albumServise.delete(params.id, header.host);
  }
}
