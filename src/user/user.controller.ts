import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  getAllUsers() {
    return 'get all users';
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return 'get user by id';
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return 'create user';
  }

  @Put(':id')
  updatePass(@Param('id') id: string) {
    return 'update pass';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'delete user';
  }
}
