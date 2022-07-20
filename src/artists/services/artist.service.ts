import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IArtist } from '../interfaces/artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { sendRequest } from 'src/sendRequest';
import { ArtistPrismaService } from './artist.prisma.service';
import { checkValidation } from '../../checkValidation';
import { createId } from "../../createId";

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[] = [];
  constructor(private artistPrismaService: ArtistPrismaService) {}

  async findAll() {
    await this.artistPrismaService.findAll();
    return this.artists;
  }

  async findOne(id: string) {
    checkValidation(id);
    const artist = await this.artistPrismaService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    return artist;
  }

  async create(createArtist: CreateArtistDto) {
    let id = await createId(this.artistPrismaService, "findOne");
    const artist = Object.assign({ id: id }, createArtist);
    const createdArtist = await this.artistPrismaService.create(artist);
    return createdArtist;
  }

  async update(id: string, createArtist: CreateArtistDto) {
    checkValidation(id);
    const artist = await this.artistPrismaService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    const updatedArtist = await this.artistPrismaService.update(id, createArtist);
    return updatedArtist;
  }

  async delete(id: string, host: string) {
    checkValidation(id);
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
