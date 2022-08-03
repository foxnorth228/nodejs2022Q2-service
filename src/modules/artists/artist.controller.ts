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
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistService } from './services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistservice: ArtistService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.artistservice.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.artistservice.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistservice.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return await this.artistservice.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @Headers('host') host: string) {
    await this.artistservice.delete(id, host);
  }
}
