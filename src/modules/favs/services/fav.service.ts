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
import { ProcessorId } from 'src/secondaryFuncs/ProcessorId';
import { FavPrismaService } from './fav.prisma.servise';

const checkUnprocEntity = (elem: any, message: string) => {
  if (!elem) {
    throw new UnprocessableEntityException(message);
  }
};

const checkBadRequest = (elem: any, message: string) => {
  if (!elem) {
    throw new BadRequestException(message);
  }
};

@Injectable()
export class FavService {
  private favPrismaService: FavPrismaService = new FavPrismaService();

  async getAllFavs() {
    const favBody: IFavBody = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const favs: IFav = await this.favPrismaService.getFavs(
      this.favPrismaService.id,
    );
    const artists: IArtist[] = await this.favPrismaService.getArtists();
    const albums: IAlbum[] = await this.favPrismaService.getAlbums();
    const tracks: ITrack[] = await this.favPrismaService.getTracks();
    for (const id of favs.artists) {
      const answer: IArtist = artists.find((el) => el.id === id);
      favBody.artists.push(answer);
    }
    for (const id of favs.albums) {
      const answer: IAlbum = albums.find((el) => el.id === id);
      favBody.albums.push(answer);
    }
    for (const id of favs.tracks) {
      const answer: ITrack = tracks.find((el) => el.id === id);
      favBody.tracks.push(answer);
    }
    return favBody;
  }

  async addArtist(id: string) {
    ProcessorId.checkValidation(id);
    const artist: IArtist = await this.favPrismaService.getArtist(id);
    checkUnprocEntity(artist, `Artist with id: "${id}" didn't exist`);
    await this.favPrismaService.addArtist(id);
    return `Artist id: "${id}" successfully added to favourites`;
  }

  async removeArtist(id: string) {
    ProcessorId.checkValidation(id);
    const artist: string | null = await this.favPrismaService.getArtistFromFavs(
      id,
    );
    checkBadRequest(artist, `Artist with id: "${id}" didn't favourite`);
    await this.favPrismaService.removeArtist(id);
    return `Artist id: "${id}" successfully deleted from favourites`;
  }

  async addAlbum(id: string) {
    ProcessorId.checkValidation(id);
    const album: IAlbum = await this.favPrismaService.getAlbum(id);
    checkUnprocEntity(album, `Album with id: "${id}" didn't exist`);
    await this.favPrismaService.addAlbum(id);
    return `Album id: "${id}" successfully added to favourites`;
  }

  async removeAlbum(id: string) {
    ProcessorId.checkValidation(id);
    const album: string | null = await this.favPrismaService.getAlbumFromFavs(
      id,
    );
    checkBadRequest(album, `Album with id: "${id}" didn't favourite`);
    await this.favPrismaService.removeAlbum(id);
    return `Album id: "${id}" successfully deleted from favourites`;
  }

  async addTrack(id: string) {
    ProcessorId.checkValidation(id);
    const track: ITrack = await this.favPrismaService.getTrack(id);
    checkUnprocEntity(track, `Track with id: "${id}" didn't exist`);
    await this.favPrismaService.addTrack(id);
    return `Track id: "${id}" successfully added to favourites`;
  }

  async removeTrack(id: string) {
    ProcessorId.checkValidation(id);
    const track: string | null = await this.favPrismaService.getTrackFromFavs(
      id,
    );
    checkBadRequest(track, `Track with id: "${id}" didn't favourite`);
    await this.favPrismaService.removeTrack(id);
    return `Track id: "${id}" successfully deleted from favourites`;
  }
}
