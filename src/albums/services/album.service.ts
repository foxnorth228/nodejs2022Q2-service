import { IAlbum } from '../interfaces/album.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';
import { AlbumPrismaService } from './album.prisma.service';

@Injectable()
export class AlbumService {
  private albumPrismaService: AlbumPrismaService = new AlbumPrismaService();
  async findAll() {
    return await this.albumPrismaService.findAll();
  }

  async findOne(id: string) {
    ProcessorId.checkValidation(id);
    const album = await this.albumPrismaService.findOne(id);
    if (!album) {
      throw new NotFoundException(`album with id: "${id}" is not exist`);
    }
    return album;
  }

  async create(createalbum: CreateAlbumDto) {
    const id = await ProcessorId.createId(this.albumPrismaService);
    const album = Object.assign({ id: id }, createalbum);
    const createdAlbum = await this.albumPrismaService.create(album);
    return createdAlbum;
  }

  async update(id: string, createAlbum: CreateAlbumDto) {
    ProcessorId.checkValidation(id);
    const album = await this.albumPrismaService.findOne(id);
    if (!album) {
      throw new NotFoundException(`album with id: "${id}" is not exist`);
    }
    const updatedAlbum = await this.albumPrismaService.update(id, createAlbum);
    return updatedAlbum;
  }

  async delete(id: string, host: string) {
    ProcessorId.checkValidation(id);
    const album = await this.albumPrismaService.findOne(id);
    if (!album) {
      throw new NotFoundException(`album with id: "${id}" is not exist`);
    }
    await sendRequest(`http://${host}/favs/album/${id}`, 'DELETE');
    await sendRequest(`http://${host}/track/album/${id}`, 'DELETE');
    await this.albumPrismaService.delete(id);
  }

  async deleteArtistFromAlbums(id: string) {
    return await this.albumPrismaService.deleteArtistFromAlbum(id);
  }
}
