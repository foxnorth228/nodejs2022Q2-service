import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrackPrismaService } from './services/track.prisma.service';
import { TrackService } from './services/track.service';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService, TrackPrismaService],
  controllers: [TrackController],
  imports: [PrismaModule],
  exports: [],
})
export class TrackModule {}
