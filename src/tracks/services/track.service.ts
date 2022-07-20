import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ITrack } from '../interfaces/track.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { validate, v4 } from 'uuid';
import { sendRequest } from 'src/sendRequest';
import { TrackPrismaService } from './track.prisma.service';
import { createId } from '../../createId';

const checkValidation = (id) => {
  if (!validate(id)) {
    throw new BadRequestException(`This id: "${id}" is not valid`);
  }
};

@Injectable()
export class TrackService {
  private readonly tracks: ITrack[] = [];
  constructor(private trackPrismaService: TrackPrismaService) {}

  async findAll() {
    return await this.trackPrismaService.findAll();
  }

  async findOne(id: string) {
    checkValidation(id);
    const track = await this.trackPrismaService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id: "${id}" is not exist`);
    }
    return track;
  }

  async create(createtrack: CreateTrackDto) {
    const id = await createId(this.trackPrismaService, 'findOne');
    const track = Object.assign({ id: id }, createtrack);
    const createdTrack = await this.trackPrismaService.create(track);
    return createdTrack;
  }

  async update(id: string, createtrack: CreateTrackDto) {
    checkValidation(id);
    const track = await this.trackPrismaService.findOne(id);
    if (!track) {
      throw new NotFoundException(`track with id: "${id}" is not exist`);
    }
    const updatedTrack = await this.trackPrismaService.update(id, createtrack);
    return updatedTrack;
  }

  async delete(id: string, host) {
    checkValidation(id);
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
