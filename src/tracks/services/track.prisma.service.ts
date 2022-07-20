import { ITrack } from '../interfaces/track.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { elementPrismaService } from '../../abstractClass';
import { CreateTrackDto } from '../dto/create-track.dto';

@Injectable()
export class TrackPrismaService extends elementPrismaService<ITrack> {
  constructor(private prismaService: PrismaService) {
    super();
  }
  async findOne(id: string): Promise<ITrack | null> {
    const track = await this.prismaService.track.findUnique({
      where: {
        id: id,
      },
    });
    return track;
  }

  async findAll() {
    return await this.prismaService.track.findMany({});
  }

  async create(track: ITrack): Promise<ITrack> {
    const createdTrack = await this.prismaService.track.create({
      data: {
        id: track.id,
        name: track.name,
        artistId: track.artistId,
        albumId: track.albumId,
        duration: track.duration,
      },
    });
    return createdTrack;
  }

  async update(id: string, track: CreateTrackDto): Promise<ITrack> {
    const updatedTrack = await this.prismaService.track.update({
      where: {
        id: id,
      },
      data: {
        name: track.name,
        artistId: track.artistId,
        albumId: track.albumId,
        duration: track.duration,
      },
    });
    return updatedTrack;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.track.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteArtistFromTracks(id: string) {
    const tracks = await this.findAll();
    let count = 0;
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.update(track.id, {
          name: track.name,
          duration: track.duration,
          artistId: null,
          albumId: track.albumId,
        });
        count++;
      }
    }
    return `${count} tracks was changed, artistId was removed`;
  }

  async deleteAlbumFromTracks(id: string) {
    const tracks = await this.findAll();
    let count = 0;
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.update(track.id, {
          name: track.name,
          duration: track.duration,
          artistId: track.artistId,
          albumId: null,
        });
        count++;
      }
    }
    return `${count} tracks was changed, albumId was removed`;
  }
}
