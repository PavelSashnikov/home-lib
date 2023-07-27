import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser, IUserSafety } from 'src/entities/interfaces/user.interface';
import { UserDBService } from 'src/global/user-db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userDb: UserDBService) {}

  getUsers() {
    return this.userDb.getUsers();
  }

  getUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = this.userDb.getUser(id, true) as IUser;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userDb.getUser(id);
  }

  addUser(user: CreateUserDto) {
    return this.userDb.addUser(user);
  }

  updatePass(id: string, passes: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = this.userDb.getUser(id, true) as IUser;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.password !== passes.oldPassword) {
      throw new ForbiddenException('wrong password');
    }
    return this.userDb.update(id, passes.newPassword);
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = this.userDb.getUser(id, true) as IUser;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    this.userDb.delete(id);
  }
}
