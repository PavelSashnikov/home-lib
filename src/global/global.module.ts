import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';
import { ArtisDBService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDBService } from './album-db.service';
import { FavoritesDbService } from './favorites-db.service';

@Global()
@Module({
  controllers: [],
  providers: [
    UserDBService,
    ArtisDBService,
    TrackDbService,
    AlbumDBService,
    FavoritesDbService,
  ],
  exports: [
    UserDBService,
    ArtisDBService,
    TrackDbService,
    AlbumDBService,
    FavoritesDbService,
  ],
})
export class GlobalModule {}
