import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Public } from 'src/decorators/aspublic';
import { RefreshTokenDto } from './dto/create-auth.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new LoggerService(AuthService.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signup(createUserDto);
    } catch (error) {
      this.logger.error(error.message, AuthService.name);
      throw error;
    }
  }
  @Public()
  @Post('login')
  async login(@Body() updateUserDto: UpdateUserDto) {
    try {
      return this.authService.login(updateUserDto);
    } catch (error) {
      this.logger.error(error.message, AuthService.name);
      throw error;
    }
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return this.authService.refreshToken(refreshTokenDto);
    } catch (error) {
      this.logger.error(error.message, AuthService.name);
      throw error;
    }
  }
}
