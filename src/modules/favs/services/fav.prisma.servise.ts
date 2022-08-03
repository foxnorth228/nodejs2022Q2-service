import { PrismaService } from '../../prisma/prisma';
import { IArtist } from '../../artists/interfaces/artist.interface';
import { IAlbum } from '../../albums/interfaces/album.interface';
import { ITrack } from '../../tracks/interfaces/track.interface';
import { IFav } from '../interfaces/fav.interface';
import { v4 } from 'uuid';

type IElement = IAlbum | IArtist | ITrack | null;

export class FavPrismaService {
  constructor() {
    this.createFav();
  }

  public id: string = v4();
  private prismaService: PrismaService = new PrismaService();

  async createFav(): Promise<void> {
    await this.prismaService.fav.create({
      data: {
        id: this.id,
        artists: [],
        albums: [],
        tracks: [],
      },
    });
  }

  async getFavs(id: string): Promise<IFav> {
    return await this.prismaService.fav.findUnique({
      where: {
        id: id,
      },
    });
  }

  async addElement(id: string, type: string): Promise<string[]> {
    const favs: IFav = await this.getFavs(this.id);
    type = type + 's';
    const elements: string[] = favs[type];
    elements.push(id);
    return elements;
  }

  async getElement(id: string, type: string): Promise<IElement> {
    return await this.prismaService[type].findUnique({
      where: {
        id: id,
      },
    });
  }

  async getElements(type: string): Promise<IElement[]> {
    return await this.prismaService[type].findMany({});
  }

  async getElementFromFavs(id: string, type: string): Promise<string | null> {
    const favs: IFav = await this.getFavs(this.id);
    type = type + 's';
    const elements: string[] = favs[type];
    const elementIndex: number = elements.indexOf(id);
    return elementIndex === -1 ? null : id;
  }

  async removeElement(id: string, type: string): Promise<string[]> {
    const favs: IFav = await this.getFavs(this.id);
    type = type + 's';
    const elements: string[] = favs[type];
    const elementIndex: number = elements.indexOf(id);
    elements.splice(elementIndex, 1);
    return elements;
  }

  async getArtist(id: string): Promise<IArtist | null> {
    return (await this.getElement(id, 'artist')) as IArtist;
  }

  async getArtists(): Promise<IArtist[]> {
    return (await this.getElements('artist')) as IArtist[];
  }

  async addArtist(id: string): Promise<void> {
    const artists: string[] = await this.addElement(id, 'artist');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        artists: artists,
      },
    });
  }

  async getArtistFromFavs(id: string): Promise<string | null> {
    return await this.getElementFromFavs(id, 'artist');
  }

  async removeArtist(id: string): Promise<void> {
    const artists: string[] = await this.removeElement(id, 'artist');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        artists: artists,
      },
    });
  }

  async getAlbum(id: string): Promise<IAlbum | null> {
    return (await this.getElement(id, 'album')) as IAlbum;
  }

  async getAlbums(): Promise<IAlbum[]> {
    return (await this.getElements('album')) as IAlbum[];
  }

  async addAlbum(id: string): Promise<void> {
    const albums: string[] = await this.addElement(id, 'album');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        albums: albums,
      },
    });
  }

  async getAlbumFromFavs(id: string): Promise<string | null> {
    return await this.getElementFromFavs(id, 'album');
  }

  async removeAlbum(id: string): Promise<void> {
    const albums: string[] = await this.removeElement(id, 'album');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        albums: albums,
      },
    });
  }

  async getTrack(id: string): Promise<ITrack | null> {
    return (await this.getElement(id, 'track')) as ITrack;
  }

  async getTracks(): Promise<ITrack[]> {
    return (await this.getElements('track')) as ITrack[];
  }

  async addTrack(id: string): Promise<void> {
    const tracks: string[] = await this.addElement(id, 'track');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        tracks: tracks,
      },
    });
  }

  async getTrackFromFavs(id: string): Promise<string | null> {
    return await this.getElementFromFavs(id, 'track');
  }

  async removeTrack(id: string): Promise<void> {
    const tracks: string[] = await this.removeElement(id, 'track');
    await this.prismaService.fav.update({
      where: {
        id: this.id,
      },
      data: {
        tracks: tracks,
      },
    });
  }
}
