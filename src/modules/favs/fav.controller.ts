import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FavService } from './services/fav.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('favs')
export class FavController {
  constructor(private favService: FavService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.favService.getAllFavs();
  }

  @Post('artist/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async addArtist(@Param('id') id: string) {
    return await this.favService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeArtist(@Param('id') id: string) {
    return await this.favService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async addAlbum(@Param('id') id: string) {
    return await this.favService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeAlbum(@Param('id') id: string) {
    return await this.favService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async addTrack(@Param('id') id: string) {
    return await this.favService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeTrack(@Param('id') id: string) {
    return await this.favService.removeTrack(id);
  }
}
