import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from '../interfaces/artist.interface';

@Injectable()
export class ArtistPrismaService {
  constructor(private prismaService: PrismaService) {}

  async create(artist: IArtist): Promise<IArtist> {
    const createdArtist = await this.prismaService.artist.create({
      data: {
        id: artist.id,
        name: artist.name,
        grammy: artist.grammy,
      },
    });
    return createdArtist;
  }

  async findAll(): Promise<Array<IArtist>> {
    return await this.prismaService.artist.findMany({});
  }

  async findOne(id: string): Promise<IArtist | null> {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id: id,
      },
    });
    return artist;
  }

  async update(id: string, artist: CreateArtistDto): Promise<IArtist> {
    const updatedArtist = this.prismaService.artist.update({
      where: {
        id: id,
      },
      data: {
        name: artist.name,
        grammy: artist.grammy,
      },
    });
    return updatedArtist;
  }

  async delete(id: string) {
    await this.prismaService.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
