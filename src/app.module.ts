import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { ArtistController } from './artists/artist.controller';
import { AlbumController } from './albums/album.controller';
import { TrackController } from './tracks/track.controller';
import { FavController } from './favs/fav.controller';
import { UserService } from "./users/services/user.service";
import { ArtistService } from './artists/services/artist.service';
import { AlbumService } from './albums/services/album.service';
import { TrackService } from './tracks/services/track.service';
import { FavService } from './favs/services/fav.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController, AlbumController, TrackController, FavController],
  providers: [AppService, UserService, ArtistService, AlbumService, TrackService, FavService],
})
export class AppModule {}
