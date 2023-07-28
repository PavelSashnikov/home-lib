import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';
import { ArtisDBService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDBService } from './album-db.service';

@Global()
@Module({
  controllers: [],
  providers: [UserDBService, ArtisDBService, TrackDbService, AlbumDBService],
  exports: [UserDBService, ArtisDBService, TrackDbService, AlbumDBService],
})
export class GlobalModule {}
