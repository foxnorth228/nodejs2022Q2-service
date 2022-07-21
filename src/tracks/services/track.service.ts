import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from '../interfaces/track.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { sendRequest } from '../../secondaryFuncs/sendRequest';
import { TrackPrismaService } from './track.prisma.service';
import { ProcessorId } from '../../secondaryFuncs/ProcessorId';

@Injectable()
export class TrackService {
  private trackPrismaService: TrackPrismaService = new TrackPrismaService();
  async findAll() {
    return await this.trackPrismaService.findAll();
  }

  async findOne(id: string) {
    ProcessorId.checkValidation(id);
    const track = await this.trackPrismaService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id: "${id}" is not exist`);
    }
    return track;
  }

  async create(createtrack: CreateTrackDto) {
    const id = await ProcessorId.createId(this.trackPrismaService);
    const track = Object.assign({ id: id }, createtrack);
    const createdTrack = await this.trackPrismaService.create(track);
    return createdTrack;
  }

  async update(id: string, createtrack: CreateTrackDto) {
    ProcessorId.checkValidation(id);
    const track = await this.trackPrismaService.findOne(id);
    if (!track) {
      throw new NotFoundException(`track with id: "${id}" is not exist`);
    }
    const updatedTrack = await this.trackPrismaService.update(id, createtrack);
    return updatedTrack;
  }

  async delete(id: string, host) {
    ProcessorId.checkValidation(id);
    const track = await this.trackPrismaService.findOne(id);
    if (!track) {
      throw new NotFoundException(`track with id: "${id}" is not exist`);
    }
    await sendRequest(`http://${host}/favs/track/${id}`, 'DELETE');
    await this.trackPrismaService.delete(id);
  }

  async deleteArtistFromTracks(id: string) {
    return await this.trackPrismaService.deleteArtistFromTracks(id);
  }

  async deleteAlbumFromTracks(id: string) {
    return await this.trackPrismaService.deleteAlbumFromTracks(id);
  }
}
