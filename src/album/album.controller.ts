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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { ErrorDto } from 'src/global/error.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): AlbumDto[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'album found',
    type: AlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if album id is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === albumId doesn't exist",
    type: ErrorDto,
  })
  getAlbumById(@Param('id') id: string): AlbumDto {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created successfully',
    type: AlbumDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body does not contain required fields',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() al: CreateAlbumDto): AlbumDto {
    return this.albumService.addAlbum(al);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'if request is valid',
    type: AlbumDto,
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
  update(@Param('id') id: string, @Body() al: CreateAlbumDto): AlbumDto {
    return this.albumService.updateAlbum(id, al);
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
    description: "if record with provided id doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.albumService.delete(id);
  }
}
