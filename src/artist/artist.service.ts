import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtisDBService } from 'src/global/artist-db.service';
import { ArtistDto } from './dto/artist.dto';
import { validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistDb: ArtisDBService) {}

  getAll(): ArtistDto[] {
    return this.artistDb.getAll();
  }

  getArtist(id: string): ArtistDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = this.artistDb.getArtist(id);
    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return artist;
  }

  addArtist(art: CreateArtistDto): ArtistDto {
    return this.artistDb.addArtist(art);
  }

  updateArtist(id: string, art: CreateArtistDto): ArtistDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = this.artistDb.getArtist(id);
    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    return this.artistDb.update(id, art);
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = this.artistDb.getArtist(id);
    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    return this.artistDb.delete(id);
  }
}
