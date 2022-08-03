import { ITrack } from '../interfaces/track.interface';
import { PrismaService } from '../../../prisma/prisma';
import { TemplatePrismaService } from '../../../secondaryFuncs/TemplatePrismaService';
import { CreateTrackDto } from '../dto/create-track.dto';

export class TrackPrismaService extends TemplatePrismaService<ITrack> {
  private prismaService: PrismaService = new PrismaService();

  async create(track: ITrack): Promise<ITrack> {
    const createdTrack: ITrack = await this.prismaService.track.create({
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

  async findAll(): Promise<ITrack[]> {
    return await this.prismaService.track.findMany({});
  }

  async findOne(id: string): Promise<ITrack | null> {
    const track: ITrack = await this.prismaService.track.findUnique({
      where: {
        id: id,
      },
    });
    return track;
  }

  async update(id: string, track: CreateTrackDto): Promise<ITrack> {
    const updatedTrack: ITrack = await this.prismaService.track.update({
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

  async deleteArtistFromTracks(id: string): Promise<string> {
    const tracks: ITrack[] = await this.findAll();
    let count = 0;
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.prismaService.track.update({
          where: {
            id: track.id,
          },
          data: {
            artistId: null,
          },
        });
        count++;
      }
    }
    return `${count} tracks was changed, artistId was removed`;
  }

  async deleteAlbumFromTracks(id: string): Promise<string> {
    const tracks: ITrack[] = await this.findAll();
    let count = 0;
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.prismaService.track.update({
          where: {
            id: track.id,
          },
          data: {
            albumId: null,
          },
        });
        count++;
      }
    }
    return `${count} tracks was changed, albumId was removed`;
  }
}
