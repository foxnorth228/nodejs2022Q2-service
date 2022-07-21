import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavController } from './fav.controller';
import { FavPrismaService } from './services/fav.prisma.servise';
import { FavService } from './services/fav.service';

@Module({
  providers: [FavService, FavPrismaService],
  controllers: [FavController],
  imports: [PrismaModule],
  exports: [],
})
export class FavModule {}
