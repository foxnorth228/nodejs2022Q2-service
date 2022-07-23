import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { ArtistPrismaService } from './artist.prisma.service';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';
import { checkNotFound } from 'src/secondaryFuncs/checkNotFound';
import { IArtist } from '../interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private artistPrismaService: ArtistPrismaService = new ArtistPrismaService();

  async create(createArtist: CreateArtistDto): Promise<IArtist> {
    const id: string = await ProcessorId.createId(this.artistPrismaService);
    const artist: IArtist = {
      id: id,
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
    const createdArtist: IArtist = await this.artistPrismaService.create(
      artist,
    );
    return createdArtist;
  }

  async findAll(): Promise<IArtist[]> {
    return await this.artistPrismaService.findAll();
  }

  async findOne(id: string): Promise<IArtist> {
    ProcessorId.checkValidation(id);
    const artist: IArtist = await this.artistPrismaService.findOne(id);
    checkNotFound(artist, `Artist with id: "${id}" is not exist`);
    return artist;
  }

  async update(id: string, createArtist: CreateArtistDto): Promise<IArtist> {
    ProcessorId.checkValidation(id);
    const artist: IArtist = await this.artistPrismaService.findOne(id);
    checkNotFound(artist, `Artist with id: "${id}" is not exist`);
    const updatedArtist: IArtist = await this.artistPrismaService.update(
      id,
      createArtist,
    );
    return updatedArtist;
  }

  async delete(id: string, host: string): Promise<void> {
    ProcessorId.checkValidation(id);
    const artist: IArtist = await this.artistPrismaService.findOne(id);
    checkNotFound(artist, `Artist with id: "${id}" is not exist`);
    await sendRequest(`http://${host}/favs/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/album/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/track/artist/${id}`, 'DELETE');
    await this.artistPrismaService.delete(id);
  }
}
