import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ITrack } from 'src/entities/interfaces/track.interface';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { FavoritesDbService } from './favorites-db.service';

@Injectable()
export class TrackDbService {
  constructor(
    @Inject(forwardRef(() => FavoritesDbService))
    private readonly favsDb: FavoritesDbService,
  ) {
    this.DB = [];
  }
  private DB: ITrack[];

  getAll() {
    return this.DB.map((t) => ({ ...t }));
  }

  getTrack(id: string, isDirty = false) {
    const track = this.DB.find((tr) => tr.id === id);
    if (!track) {
      return null;
    }
    if (isDirty) {
      return track;
    }
    return { ...track };
  }

  addTrack(tr: CreateTrackDto) {
    const newTrack: ITrack = {
      id: randomUUID(),
      name: tr.name,
      artistId: tr.artistId || null,
      albumId: tr.albumId || null,
      duration: tr.duration,
    };
    this.DB.push(newTrack);
    return newTrack;
  }

  update(id: string, tr: CreateTrackDto) {
    const track = { ...this.getTrack(id), ...tr };

    return track;
  }

  delete(id: string) {
    const i = this.DB.findIndex((tr) => tr.id === id);
    this.DB.splice(i, 1);
    this.favsDb.deleteTrack(id);
  }

  clearAlbumField(albumId: string) {
    this.DB.forEach((tr) => {
      if (tr.albumId === albumId) {
        tr.albumId = null;
      }
    });
  }

  clearArtistField(artistId: string) {
    this.DB.forEach((tr) => {
      if (tr.artistId === artistId) {
        tr.artistId = null;
      }
    });
  }
}
