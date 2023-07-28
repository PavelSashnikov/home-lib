import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [GlobalModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
