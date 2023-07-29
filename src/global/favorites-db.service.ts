import { Injectable } from '@nestjs/common';
import { IFavorites } from 'src/entities/interfaces/favorite.interface';
import { ArtisDBService } from './artist-db.service';
import { TrackDbService } from './track-db.service';
import { AlbumDBService } from './album-db.service';

@Injectable()
export class FavoritesDbService {
  constructor(
    private readonly artistDb: ArtisDBService,
    private readonly trackDb: TrackDbService,
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
    this.DB.tracks.push(id);
  }
  deleteTrack(id: string) {
    const i = this.DB.tracks.findIndex((tr) => tr === id);
    this.DB.tracks.splice(i, 1);
  }

  addAlbum(id: string) {
    this.DB.albums.push(id);
  }
  deleteAlbum(id: string) {
    const i = this.DB.albums.findIndex((tr) => tr === id);
    this.DB.albums.splice(i, 1);
  }

  addArtist(id: string) {
    this.DB.artists.push(id);
  }
  deleteArtist(id: string) {
    const i = this.DB.artists.findIndex((tr) => tr === id);
    this.DB.artists.splice(i, 1);
  }
}
