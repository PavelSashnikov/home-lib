import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';
import { ArtisDBService } from './artist-db.service';

@Global()
@Module({
  controllers: [],
  providers: [UserDBService, ArtisDBService],
  exports: [UserDBService, ArtisDBService],
})
export class GlobalModule {}
