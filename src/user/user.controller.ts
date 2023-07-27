import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ErrorDto } from 'src/global/error.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): UserDto[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user found',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user found',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if userId is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === userId doesn't exist",
    type: ErrorDto,
  })
  getUserById(@Param('id') id: string): UserDto {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created successfully',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body does not contain required fields',
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto): UserDto {
    return this.userService.addUser(user);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'if request is valid',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if userId is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === userId doesn't exist",
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'if oldPassword is wrong',
    type: ErrorDto,
  })
  updatePass(
    @Param('id') id: string,
    @Body() passes: UpdatePasswordDto,
  ): UserDto {
    return this.userService.updatePass(id, passes);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'f the record is found and deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'if userId is invalid (not uuid)',
    type: ErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "if record with id === userId doesn't exist",
    type: ErrorDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): void {
    return this.userService.delete(id);
  }
}
