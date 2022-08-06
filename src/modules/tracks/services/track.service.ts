import { Injectable } from '@nestjs/common';
import { ITrack } from '../interfaces/track.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { sendRequest } from '../../../secondaryFuncs/sendRequest';
import { TrackPrismaService } from './track.prisma.service';
import { ProcessorId } from '../../../secondaryFuncs/ProcessorId';
import { checkNotFound } from 'src/secondaryFuncs/checkNotFound';
import { getUnprocessedToken } from 'src/secondaryFuncs/getTokenFromHeader';

@Injectable()
export class TrackService {
  private trackPrismaService: TrackPrismaService = new TrackPrismaService();

  async create(createTrack: CreateTrackDto): Promise<ITrack> {
    const id: string = await ProcessorId.createId(this.trackPrismaService);
    const track: ITrack = {
      id: id,
      name: createTrack.name,
      duration: createTrack.duration,
      artistId: createTrack.artistId,
      albumId: createTrack.albumId,
    };
    const createdTrack: ITrack = await this.trackPrismaService.create(track);
    return createdTrack;
  }

  async findAll(): Promise<ITrack[]> {
    return await this.trackPrismaService.findAll();
  }

  async findOne(id: string): Promise<ITrack> {
    ProcessorId.checkValidation(id);
    const track: ITrack = await this.trackPrismaService.findOne(id);
    checkNotFound(track, `Track with id: "${id}" is not exist`);
    return track;
  }

  async update(id: string, createtrack: CreateTrackDto): Promise<ITrack> {
    ProcessorId.checkValidation(id);
    const track: ITrack = await this.trackPrismaService.findOne(id);
    checkNotFound(track, `Track with id: "${id}" is not exist`);
    const updatedTrack: ITrack = await this.trackPrismaService.update(
      id,
      createtrack,
    );
    return updatedTrack;
  }

  async delete(id: string, host, header): Promise<void> {
    ProcessorId.checkValidation(id);
    const track: ITrack = await this.trackPrismaService.findOne(id);
    checkNotFound(track, `Track with id: "${id}" is not exist`);
    await sendRequest(
      `http://${host}/favs/track/${id}`,
      'DELETE',
      {},
      {
        Authorization: getUnprocessedToken(header),
      },
    );
    await this.trackPrismaService.delete(id);
  }

  async deleteArtistFromTracks(id: string): Promise<string> {
    return await this.trackPrismaService.deleteArtistFromTracks(id);
  }

  async deleteAlbumFromTracks(id: string): Promise<string> {
    return await this.trackPrismaService.deleteAlbumFromTracks(id);
  }
}
