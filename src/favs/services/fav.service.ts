import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IArtist } from '../../artists/interfaces/artist.interface';
import { IAlbum } from '../../albums/interfaces/album.interface';
import { ITrack } from '../../tracks/interfaces/track.interface';
import { IFavBody } from '../interfaces/fav-body.interface';
import { IFav } from '../interfaces/fav.interface';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';
import { FavPrismaService } from './fav.prisma.servise';

@Injectable()
export class FavService {
  private favPrismaService: FavPrismaService = new FavPrismaService();

  async getAllFavs() {
    const favBody: IFavBody = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const favs = await this.favPrismaService.getFavs(this.favPrismaService.id);
    for (const id of favs.artists) {
      const answer = await this.favPrismaService.getArtist(id);
      favBody.artists.push(answer);
    }
    for (const id of favs.albums) {
      const answer = await this.favPrismaService.getAlbum(id);
      favBody.albums.push(answer);
    }
    for (const id of favs.tracks) {
      const answer = await this.favPrismaService.getTrack(id);
      favBody.tracks.push(answer);
    }
    return favBody;
  }

  async addArtist(id: string, host: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id: "${id}" didn't exist`,
      );
    }
    await this.favPrismaService.addArtist(id);
    return `Artist id: "${id}" successfully added to favourites`;
  }

  async removeArtist(id: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getArtistFromFavs(id);
    if (!artist) {
      throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
    }
    await this.favPrismaService.removeArtist(id);
    return `Artist id: "${id}" successfully deleted from favourites`;
  }

  async addAlbum(id: string, host: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getAlbum(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id: "${id}" didn't exist`,
      );
    }
    await this.favPrismaService.addAlbum(id);
    return `Artist id: "${id}" successfully added to favourites`;
  }

  async removeAlbum(id: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getAlbumFromFavs(id);
    if (!artist) {
      throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
    }
    await this.favPrismaService.removeAlbum(id);
    return `Artist id: "${id}" successfully deleted from favourites`;
  }

  async addTrack(id: string, host: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getTrack(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id: "${id}" didn't exist`,
      );
    }
    await this.favPrismaService.addTrack(id);
    return `Artist id: "${id}" successfully added to favourites`;
  }

  async removeTrack(id: string) {
    ProcessorId.checkValidation(id);
    const artist = await this.favPrismaService.getTrackFromFavs(id);
    if (!artist) {
      throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
    }
    await this.favPrismaService.removeTrack(id);
    return `Artist id: "${id}" successfully deleted from favourites`;
  }
}
