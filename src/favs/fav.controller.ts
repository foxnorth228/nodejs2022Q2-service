import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { FavService } from './services/fav.service';

@Controller('favs')
export class FavController {
  constructor(private favService: FavService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.favService.getAllFavs();
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    return await this.favService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string) {
    return await this.favService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    return await this.favService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string) {
    return await this.favService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    return await this.favService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    return await this.favService.removeTrack(id);
  }
}
