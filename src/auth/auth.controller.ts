import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Public } from 'src/decorators/aspublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
  @Public()
  @Post('login')
  async login(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.login(updateUserDto);
  }

  // @Post('refresh')
  // // refreshToken(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // refreshToken(@Req() req: Request) {
  //   console.log(req.headers.authorization);
  //   // return this.authService.refreshToken(updateUserDto);
  // }
}
