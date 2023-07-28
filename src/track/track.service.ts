import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackDbService } from 'src/global/track-db.service';
import { validate } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly trackDb: TrackDbService) {}

  getAll(): TrackDto[] {
    return this.trackDb.getAll();
  }

  getOne(id: string): TrackDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const track = this.trackDb.getTrack(id);
    if (!track) {
      throw new NotFoundException('track not found');
    }

    return track;
  }

  add(tr: CreateTrackDto): TrackDto {
    return this.trackDb.addTrack(tr);
  }

  update(id: string, tr: CreateTrackDto): TrackDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const track = this.trackDb.getTrack(id);
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return this.trackDb.update(id, tr);
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const track = this.trackDb.getTrack(id);
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return this.trackDb.delete(id);
  }
}
