import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const now = Math.floor(Date.now() / 1000);
    const dateTimeToIntUser = {
      ...createUserDto,
      createdAt: now,
      updatedAt: now,
    };
    const newUser = await this.database.user.create({
      data: dateTimeToIntUser,
    });
    const { password, ...newUserWithoutPassword } = newUser;
    return newUserWithoutPassword;
  }

  findAll() {
    return this.database.user.findMany();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const now = Math.floor(Date.now() / 1000);
    const { newPassword, oldPassword } = updatePasswordDto;

    const fondedUser = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (fondedUser) {
      if (fondedUser.password === oldPassword) {
        const user = await this.database.user.update({
          where: {
            id,
          },
          data: {
            ...fondedUser,
            password: newPassword,
            version: fondedUser.version + 1,
            updatedAt: now + 1,
          },
        });
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } else {
        throw new ForbiddenException('Access denied');
      }
    }

    throw new NotFoundException('User not found');
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      await this.database.user.delete({
        where: {
          id,
        },
      });
      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
