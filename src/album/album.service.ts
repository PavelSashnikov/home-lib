import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumDBService } from 'src/global/album-db.service';
import { AlbumDto } from './dto/album.dto';
import { validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumDb: AlbumDBService) {}

  getAll(): AlbumDto[] {
    return this.albumDb.getAll();
  }

  getAlbum(id: string): AlbumDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = this.albumDb.getAlbum(id);
    if (!album) {
      throw new NotFoundException('album not found');
    }

    return album;
  }

  addAlbum(al: CreateAlbumDto): AlbumDto {
    return this.albumDb.addAlbum(al);
  }

  updateAlbum(id: string, al: CreateAlbumDto): AlbumDto {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = this.albumDb.getAlbum(id);
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return this.albumDb.update(id, al);
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = this.albumDb.getAlbum(id);
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return this.albumDb.delete(id);
  }
}
