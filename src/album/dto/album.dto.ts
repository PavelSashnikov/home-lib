import { IAlbum } from 'src/entities/interfaces/album.interface';

export class AlbumDto implements IAlbum {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly artistId: string | null;
}
