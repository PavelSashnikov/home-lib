import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { IArtist } from 'src/entities/interfaces/artist.interface';

@Injectable()
export class UserDBService {
  constructor() {
    this.DB = [];
  }
  private DB: IArtist[];

  getAll() {
    return this.DB.map((art) => ({ ...art }));
  }

  getArtist(id: string, isDirty = false) {
    const artist = this.DB.find((art) => art.id === id);
    if (!artist) {
      return null;
    }
    if (isDirty) {
      return artist;
    }
    return { ...artist };
  }

  addArtist(art: CreateArtistDto) {
    const newArtist: IArtist = {
      id: randomUUID(),
      name: art.name,
      grammy: art.grammy,
    };
    this.DB.push(newArtist);
    return newArtist;
  }

  update(id: string, art: CreateArtistDto) {
    const artist = this.getArtist(id, true);
    artist.grammy = art.grammy;
    artist.name = art.name;
    return { ...artist };
  }

  delete(id: string) {
    const i = this.DB.findIndex((art) => art.id === id);
    this.DB.splice(i, 1);
  }
}
