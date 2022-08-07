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
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistService } from './services/artist.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private artistservice: ArtistService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.artistservice.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.artistservice.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistservice.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return await this.artistservice.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
    @Headers('host') host: string,
    @Headers() headers,
  ) {
    await this.artistservice.delete(id, host, headers);
  }
}
