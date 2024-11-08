import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
