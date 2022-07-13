import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { ArtistController } from './artists/artist.controller';
import { AlbumController } from './albums/album.controller';
import { UserService } from "./users/services/user.service";
import { ArtistService } from './artists/services/artist.service';
import { AlbumService } from './albums/services/album.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController, AlbumController],
  providers: [AppService, UserService, ArtistService, AlbumService],
})
export class AppModule {}
