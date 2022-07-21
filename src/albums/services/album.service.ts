import { IAlbum } from '../interfaces/album.interface';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';
import { AlbumPrismaService } from './album.prisma.service';
import { checkNotFound } from 'src/secondaryFuncs/checkNotFound';

@Injectable()
export class AlbumService {

  private albumPrismaService: AlbumPrismaService = new AlbumPrismaService();

  async create(createAlbum: CreateAlbumDto): Promise<IAlbum> {
    const id: string = await ProcessorId.createId(this.albumPrismaService);
    const album: IAlbum = {
      id: id,
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId,
    };
    const createdAlbum = await this.albumPrismaService.create(album);
    return createdAlbum;
  }

  async findAll(): Promise<IAlbum[]> {
    return await this.albumPrismaService.findAll();
  }

  async findOne(id: string): Promise<IAlbum> {
    ProcessorId.checkValidation(id);
    const album: IAlbum = await this.albumPrismaService.findOne(id);
    checkNotFound(album, `Album with id: "${id}" is not exist`);
    return album;
  }

  async update(id: string, createAlbum: CreateAlbumDto): Promise<IAlbum> {
    ProcessorId.checkValidation(id);
    const album: IAlbum = await this.albumPrismaService.findOne(id);
    checkNotFound(album, `Album with id: "${id}" is not exist`);
    const updatedAlbum: IAlbum = await this.albumPrismaService.update(id, createAlbum);
    return updatedAlbum;
  }

  async delete(id: string, host: string): Promise<void> {
    ProcessorId.checkValidation(id);
    const album: IAlbum = await this.albumPrismaService.findOne(id);
    checkNotFound(album, `Album with id: "${id}" is not exist`);
    await sendRequest(`http://${host}/favs/album/${id}`, 'DELETE');
    await sendRequest(`http://${host}/track/album/${id}`, 'DELETE');
    await this.albumPrismaService.delete(id);
  }

  async deleteArtistFromAlbums(id: string): Promise<string> {
    return await this.albumPrismaService.deleteArtistFromAlbum(id);
  }
}
