import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/favorites-respose.dto';
import { ErrorDto } from 'src/global/error.dto';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favServise: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponseDto {
    return this.favServise.getAll();
  }

  @Post('track/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "trackId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string) {
    return this.favServise.addTrack(id);
  }

  @Delete('track/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ID is not in favorites',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favServise.deleteTrack(id);
  }

  @Post('album/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "albumId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string) {
    return this.favServise.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ID is not in favorites',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favServise.deleteAlbum(id);
  }

  @Post('artist/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'added successfully',
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "artistId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string) {
    return this.favServise.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID is invalid',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ID is not in favorites',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favServise.deleteArtist(id);
  }
}
