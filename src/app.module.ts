import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavsController } from './controllers/favs.controller';
import { UserController } from './controllers/user.controller';
import { TrackController } from './controllers/track.controller';
import { AlbumController } from './controllers/album.controller';
import { ArtistController } from './controllers/artist.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, AlbumController, 
    ArtistController, TrackController, FavsController],
  providers: [AppService],
})
export class AppModule {}
