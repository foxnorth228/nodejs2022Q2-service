import { TemplatePrismaService } from 'src/secondaryFuncs/TemplatePrismaService';
import { PrismaService } from '../../prisma/prisma';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from '../interfaces/artist.interface';

export class ArtistPrismaService extends TemplatePrismaService<IArtist> {
  private prismaService: PrismaService = new PrismaService();

  async create(artist: IArtist): Promise<IArtist> {
    const createdArtist: IArtist = await this.prismaService.artist.create({
      data: {
        id: artist.id,
        name: artist.name,
        grammy: artist.grammy,
      },
    });
    return createdArtist;
  }

  async findAll(): Promise<IArtist[]> {
    return await this.prismaService.artist.findMany({});
  }

  async findOne(id: string): Promise<IArtist | null> {
    const artist: IArtist = await this.prismaService.artist.findUnique({
      where: {
        id: id,
      },
    });
    return artist;
  }

  async update(id: string, artist: CreateArtistDto): Promise<IArtist> {
    const updatedArtist: IArtist = await this.prismaService.artist.update({
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

  async delete(id: string): Promise<void> {
    await this.prismaService.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
