import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IUser, IUserSafety } from 'src/entities/interfaces/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserDBService {
  constructor() {
    this.DB = [];
  }
  private DB: IUser[];

  private readonly userTemplate = {};

  getUsers() {
    return this.DB.map((user) => this.prepareUser(user));
  }

  getUser(id: string, returnDirty = false): IUserSafety | IUser {
    const user = this.DB.find((user) => user.id === id);
    if (returnDirty) {
      return user;
    }
    return this.prepareUser(user);
  }

  addUser(user: CreateUserDto): IUserSafety {
    const newUser = this.createUser(user);
    this.DB.push(newUser);
    const safeUser = { ...newUser };
    delete safeUser.password;
    return safeUser;
  }

  update(id: string, newPass: string): IUserSafety {
    const user = this.getUser(id, true) as IUser;
    user.password = newPass;
    user.version++;
    user.updatedAt = Date.now();

    return this.prepareUser(user);
  }

  delete(id: string): void {
    const i = this.DB.findIndex((user) => user.id === id);
    this.DB.splice(i, 1);
  }

  private prepareUser(user: IUser): IUserSafety {
    if (!user) {
      return;
    }
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  private createUser(user: CreateUserDto): IUser {
    const time = Date.now();
    return {
      login: user.login,
      password: user.password,
      id: randomUUID(),
      version: 1,
      createdAt: time,
      updatedAt: time,
    };
  }
}
