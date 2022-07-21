import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistController } from './artist.controller';
import { ArtistPrismaService } from './services/artist.prisma.service';
import { ArtistService } from './services/artist.service';

@Module({
  providers: [ArtistService, ArtistPrismaService],
  controllers: [ArtistController],
  imports: [PrismaModule],
  exports: [],
})
export class ArtistModule {}
