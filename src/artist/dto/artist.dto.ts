import { IArtist } from 'src/entities/interfaces/artist.interface';

export class ArtistDto implements IArtist {
  readonly id: string;
  readonly name: string;
  readonly grammy: boolean;
}
