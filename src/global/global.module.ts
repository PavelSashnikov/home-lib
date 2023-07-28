import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';
import { ArtisDBService } from './artist-db.service';
import { TrackDbService } from './track-db.service';

@Global()
@Module({
  controllers: [],
  providers: [UserDBService, ArtisDBService, TrackDbService],
  exports: [UserDBService, ArtisDBService, TrackDbService],
})
export class GlobalModule {}
