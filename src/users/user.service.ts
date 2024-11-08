import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.database.users.push(newUser);
    const { password, ...newUserWithoutPassword } = newUser;
    return newUserWithoutPassword;
  }

  findAll() {
    return this.database.users;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (this.database.users.some((user) => user.id === id)) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('User not found');
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword, oldPassword } = updatePasswordDto;

    const user = this.database.users.find((user) => user.id === id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (user) {
      if (user.password === oldPassword) {
        user.password = newPassword;
        user.version += 1;
        user.updatedAt = Date.now();
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } else {
        throw new ForbiddenException('Access denied');
      }
    }

    throw new NotFoundException('User not found');
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedUser = this.database.users.find((user) => user.id === id);

    if (foundedUser) {
      this.database.users = this.database.users.filter(
        (user) => user.id !== foundedUser.id,
      );
      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
