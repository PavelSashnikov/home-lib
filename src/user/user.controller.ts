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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IUserSafety } from 'src/entities/interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<IUserSafety[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<IUserSafety> {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto): Promise<IUserSafety> {
    return this.userService.addUser(user);
  }

  @Put(':id')
  updatePass(
    @Param('id') id: string,
    @Body() passes: UpdatePasswordDto,
  ): Promise<IUserSafety> {
    return this.userService.updatePass(id, passes);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
