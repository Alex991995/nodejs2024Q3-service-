import { Injectable, OnModuleInit } from '@nestjs/common';
import { Track, User, Artist, Album, FavoritesResponse } from 'src/interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
