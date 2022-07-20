import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IArtist } from '../interfaces/artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 } from 'uuid';
import { sendRequest } from 'src/sendRequest';
import { ArtistPrismaService } from './artist.prisma.service';
import { checkValidation } from '../../checkValidation';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[] = [];
  constructor(private artistPrismaService: ArtistPrismaService) {}
  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    checkValidation(id);
    const artist = this.artists.find((el) => el.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
  }

  create(createArtist: CreateArtistDto) {
    const artist = Object.assign({ id: v4() }, createArtist);
    this.artists.push(artist);
    return artist;
  }

  update(id: string, createArtist: CreateArtistDto) {
    checkValidation(id);
    const artist = this.artists.find((el) => el.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    artist.name = createArtist.name;
    artist.grammy = createArtist.grammy;
    return artist;
  }

  async delete(id: string, host: string) {
    checkValidation(id);
    const artistIndex = this.artists.findIndex((el) => el.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: "${id}" is not exist`);
    }
    await sendRequest(`http://${host}/favs/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/album/artist/${id}`, 'DELETE');
    await sendRequest(`http://${host}/track/artist/${id}`, 'DELETE');
    this.artists.splice(artistIndex, 1);
  }
}
