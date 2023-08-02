import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { IAlbum } from 'src/entities/interfaces/album.interface';
import { FavoritesDbService } from './favorites-db.service';
import { TrackDbService } from './track-db.service';

@Injectable()
export class AlbumDBService {
  constructor(
    @Inject(forwardRef(() => FavoritesDbService))
    private readonly favsDb: FavoritesDbService,
    @Inject(forwardRef(() => TrackDbService))
    private readonly trackDb: TrackDbService,
  ) {
    this.DB = [];
  }
  private DB: IAlbum[];

  getAll(): IAlbum[] {
    return this.DB.map((al) => ({ ...al }));
  }

  getAlbum(id: string, isDirty = false) {
    const album = this.DB.find((al) => al.id === id);
    if (!album) {
      return null;
    }
    if (isDirty) {
      return album;
    }
    return { ...album };
  }

  addAlbum(al: CreateAlbumDto) {
    const newAlbum: IAlbum = {
      id: randomUUID(),
      ...al,
    };
    this.DB.push(newAlbum);
    return newAlbum;
  }

  update(id: string, al: CreateAlbumDto) {
    const album = this.getAlbum(id, true);
    for (const k in al) {
      album[k] = al[k];
    }
    return { ...album };
  }

  delete(id: string) {
    const i = this.DB.findIndex((al) => al.id === id);
    this.DB.splice(i, 1);
    this.favsDb.deleteAlbum(id);
    this.trackDb.clearAlbumField(id);
  }

  clearArtistField(artistId: string) {
    this.DB.forEach((tr) => {
      if (tr.artistId === artistId) {
        tr.artistId = null;
      }
    });
  }
}
