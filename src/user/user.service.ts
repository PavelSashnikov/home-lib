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

  async getUsers(): Promise<IUserSafety[]> {
    return this.userDb.getUsers();
  }

  async getUser(id: string): Promise<IUserSafety> {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const user = this.userDb.getUser(id, true) as IUser;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userDb.getUser(id);
  }

  async addUser(user: CreateUserDto): Promise<IUserSafety> {
    return this.userDb.addUser(user);
  }

  async updatePass(
    id: string,
    passes: UpdatePasswordDto,
  ): Promise<IUserSafety> {
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

  async delete(id: string): Promise<void> {
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
