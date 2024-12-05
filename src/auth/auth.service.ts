import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import {
  SALT,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from './constants';
import { RefreshTokenDto } from './dto/create-auth.dto';
import { TokenPayload } from 'src/interface';

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService, private jwt: JwtService) {}

  async signup(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    await this.shouldNotExistUser(login);
    const bcryptPassword = await this.hashPassword(password);
    const newUser = await this.database.user.create({
      data: {
        id: uuidv4(),
        login,
        password: bcryptPassword,
        createdAt: this.createDate(),
        updatedAt: this.createDate(),
      },
    });
    const { password: p, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async login(updateUserDto: UpdateUserDto) {
    const { login, password } = updateUserDto;

    const user = await this.shouldExistUser(login);
    await this.comparePassword(password, user.password);
    const payload: TokenPayload = { userId: user.id, login };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken: token } = refreshTokenDto;
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const accessToken = await this.jwt.signAsync(payload, {
        expiresIn: TOKEN_EXPIRE_TIME,
      });

      const refreshToken = await this.jwt.signAsync(payload, {
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async shouldExistUser(login: string) {
    const foundUser = await this.database.user.findFirst({ where: { login } });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }
    return foundUser;
  }

  async shouldNotExistUser(login: string) {
    const foundUser = await this.database.user.findFirst({ where: { login } });
    if (foundUser) {
      throw new BadRequestException('The login is already taken');
    }
    return true;
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
  }
  createDate() {
    const now = Math.floor(Date.now() / 1000);
    return now;
  }
  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }
  }
}
