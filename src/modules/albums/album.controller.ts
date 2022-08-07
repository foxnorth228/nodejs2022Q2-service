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
import { AlbumService } from './services/album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('album')
export class AlbumController {
  private albumServise: AlbumService = new AlbumService();

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.albumServise.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.albumServise.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async create(@Body() createArtistDto: CreateAlbumDto) {
    return await this.albumServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateAlbumDto,
  ) {
    return await this.albumServise.update(id, updateArtistDto);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async deleteArtistFromAlbums(@Param('id') id: string) {
    await this.albumServise.deleteArtistFromAlbums(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
    @Headers('host') host: string,
    @Headers() header,
  ) {
    await this.albumServise.delete(id, host, header);
  }
}
