import { IsOptional } from 'class-validator';

export class CreateTrackDto {
  readonly name: string;
  @IsOptional()
  readonly artistId: string;
  @IsOptional()
  readonly albumId: string;
  readonly duration: number;
}
