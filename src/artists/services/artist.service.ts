import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { ArtistPrismaService } from './artist.prisma.service';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';

@Injectable()
export class ArtistService {
  private artistPrismaService: ArtistPrismaService = new ArtistPrismaService();
  async findAll() {
    return await this.artistPrismaService.findAll();
  }

  async findOne(id: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.artistPrismaService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    return artist;
  }

  async create(createArtist: CreateArtistDto) {
    const id = await ProcessorId.createId(this.artistPrismaService);
    const artist = Object.assign({ id: id }, createArtist);
    const createdArtist = await this.artistPrismaService.create(artist);
    return createdArtist;
  }

  async update(id: string, createArtist: CreateArtistDto) {
    ProcessorId.checkValidation(id);
    const artist = await this.artistPrismaService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    const updatedArtist = await this.artistPrismaService.update(
      id,
      createArtist,
    );
    return updatedArtist;
  }

  async delete(id: string, host: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.artistPrismaService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    await sendRequest(`http://${host}/favs/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/album/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/track/artist/${id}`, 'DELETE');
    await this.artistPrismaService.delete(id);
  }
}
