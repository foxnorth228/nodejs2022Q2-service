import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './services/album.service';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [PrismaModule],
  exports: [],
})
export class AlbumModule {}
