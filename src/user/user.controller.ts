import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Put(':id')
  // updatePassword(
  //   @Param('id') id: string,
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  // ) {
  //   return this.usersService.updatePassword(id, updatePasswordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string, @Res() res: Response) {
  //   const result = this.usersService.remove(id);
  //   if (result === 204) {
  //     return res.status(HttpStatus.NO_CONTENT).send();
  //   }
  // }
}
