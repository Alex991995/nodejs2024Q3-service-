import { Injectable } from '@nestjs/common';
import { Track, User, Artist, Album, FavoritesResponse } from 'src/interface';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];

  favorites: FavoritesResponse = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
