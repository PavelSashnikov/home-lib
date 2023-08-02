import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { IFavorites } from 'src/entities/interfaces/favorite.interface';
import { ArtisDBService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDBService } from './album-db.service';

@Injectable()
export class FavoritesDbService {
  constructor(
    @Inject(forwardRef(() => ArtisDBService))
    private readonly artistDb: ArtisDBService,
    @Inject(forwardRef(() => TrackDbService))
    private readonly trackDb: TrackDbService,
    @Inject(forwardRef(() => AlbumDBService))
    private readonly albumDb: AlbumDBService,
  ) {}
  private DB: IFavorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  getAll() {
    const artists = this.DB.artists.map((id) => this.artistDb.getArtist(id));
    const tracks = this.DB.tracks.map((id) => this.trackDb.getTrack(id));
    const albums = this.DB.albums.map((id) => this.albumDb.getAlbum(id));
    return {
      artists,
      tracks,
      albums,
    };
  }

  addTrack(id: string) {
    if (!this.trackDb.getTrack(id)) {
      return;
    }
    if (!this.DB.tracks.includes(id)) {
      this.DB.tracks.push(id);
    }
    return this.DB.tracks;
  }
  deleteTrack(id: string) {
    const i = this.DB.tracks.findIndex((tr) => tr === id);
    if (i >= 0) {
      return this.DB.tracks.splice(i, 1);
    }
  }

  addAlbum(id: string) {
    if (!this.albumDb.getAlbum(id)) {
      return;
    }
    if (!this.DB.albums.includes(id)) {
      this.DB.albums.push(id);
    }
    return this.DB.albums;
  }
  deleteAlbum(id: string) {
    const i = this.DB.albums.findIndex((tr) => tr === id);
    if (i >= 0) {
      return this.DB.albums.splice(i, 1);
    }
  }

  addArtist(id: string) {
    if (!this.artistDb.getArtist(id)) {
      return;
    }
    if (!this.DB.artists.includes(id)) {
      this.DB.artists.push(id);
    }
    return this.DB.artists;
  }
  deleteArtist(id: string) {
    const i = this.DB.artists.findIndex((tr) => tr === id);
    if (i >= 0) {
      return this.DB.artists.splice(i, 1);
    }
  }
}
