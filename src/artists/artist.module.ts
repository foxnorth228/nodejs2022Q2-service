import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './services/artist.service';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [PrismaModule],
  exports: [],
})
export class ArtistModule {}
