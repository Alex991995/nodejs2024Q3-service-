import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto, User } from 'src/interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class DatabaseService {
  users: User[] = [];

  albums = [];
}
