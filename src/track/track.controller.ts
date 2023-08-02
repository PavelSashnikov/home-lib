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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { ErrorDto } from 'src/global/error.dto';
import { CreateTrackDto } from './dto/create-track.dto';
@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): TrackDto[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'track found',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if track id is invalid (not uuid)',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === trackId doesn't exist",
    type: TrackDto,
  })
  getArtistById(@Param('id') id: string): TrackDto {
    return this.trackService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created successfully',
    type: TrackDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body does not contain required fields',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() tr: CreateTrackDto): TrackDto {
    return this.trackService.add(tr);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'if request is valid',
    type: TrackDto,
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
  update(@Param('id') id: string, @Body() tr: CreateTrackDto): TrackDto {
    return this.trackService.update(id, tr);
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
    description: "if record with id === trackId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    return this.trackService.delete(id);
  }
}
