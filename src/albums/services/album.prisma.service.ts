import { IAlbum } from '../interfaces/album.interface';
import { PrismaService } from '../../prisma/prisma';
import { TemplatePrismaService } from '../../secondaryFuncs/TemplatePrismaService';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class AlbumPrismaService extends TemplatePrismaService<IAlbum> {

  private prismaService: PrismaService = new PrismaService();

  async create(album: IAlbum): Promise<IAlbum> {
    const createdAlbum: IAlbum = await this.prismaService.album.create({
      data: {
        id: album.id,
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      },
    });
    return createdAlbum;
  }

  async findOne(id: string): Promise<IAlbum | null> {
    const album: IAlbum = await this.prismaService.album.findUnique({
      where: {
        id: id,
      },
    });
    return album;
  }

  async findAll(): Promise<IAlbum[]> {
    return await this.prismaService.album.findMany({});
  }

  async update(id: string, album: CreateAlbumDto): Promise<IAlbum> {
    const updatedAlbum: IAlbum = await this.prismaService.album.update({
      where: {
        id: id,
      },
      data: {
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      },
    });
    return updatedAlbum;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.album.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteArtistFromAlbum(id: string): Promise<string> {
    const albums: IAlbum[] = await this.findAll();
    let count: number = 0;
    for (const album of albums) {
      if (album.artistId === id) {
        await this.prismaService.album.update({
          where: {
            id: album.id,
           },
          data: {
            artistId: null,
          }
        });
        count++;
      }
    }
    return `${count} albums was changed, artistId was removed`;
  }
}
