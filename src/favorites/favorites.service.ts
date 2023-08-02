import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesDbService } from 'src/global/favorites-db.service';
import { FavoritesResponseDto } from './dto/favorites-respose.dto';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly favDb: FavoritesDbService) {}

  getAll(): FavoritesResponseDto {
    return this.favDb.getAll();
  }

  addTrack(id: string): string[] {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.addTrack(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteTrack(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.deleteTrack(id);
    if (!res) {
      throw new NotFoundException('track is not favorite');
    }
  }

  addAlbum(id: string): string[] {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.addAlbum(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteAlbum(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.deleteAlbum(id);
    if (!res) {
      throw new NotFoundException('album is not favorite');
    }
  }

  addArtist(id: string): string[] {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.addArtist(id);
    if (!res) {
      throw new UnprocessableEntityException();
    }
    return res;
  }

  deleteArtist(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const res = this.favDb.deleteArtist(id);
    if (!res) {
      throw new NotFoundException('artist is not favorite');
    }
  }
}
