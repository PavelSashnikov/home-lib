import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
