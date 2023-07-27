import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistDto } from './dto/artist.dto';
import { ErrorDto } from 'src/global/error.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): ArtistDto[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'artist found',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if artist id is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === artistId doesn't exist",
    type: ErrorDto,
  })
  getArtistById(@Param('id') id: string): ArtistDto {
    return this.artistService.getArtist(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created successfully',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body does not contain required fields',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() art: CreateArtistDto): ArtistDto {
    return this.artistService.addArtist(art);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'if request is valid',
    type: ArtistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if Id is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with provided id doesn't exist",
    type: ErrorDto,
  })
  update(@Param('id') id: string, @Body() art: CreateArtistDto): ArtistDto {
    return this.artistService.updateArtist(id, art);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if id is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === artistId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.artistService.delete(id);
  }
}
