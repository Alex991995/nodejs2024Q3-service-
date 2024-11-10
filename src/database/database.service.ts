import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Track, User, Artist, Album, FavoritesResponse } from 'src/interface';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];

  fav: FavoritesResponse = {
    artists: this.artists,
    albums: this.albums,
    tracks: this.tracks,
  };
}
// npm run test -- test/tracks.e2e.spec.ts
