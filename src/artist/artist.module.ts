import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
