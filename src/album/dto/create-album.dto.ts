import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly year: number;
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ nullable: true, type: String })
  readonly artistId: string | null;
}
