import { Injectable } from '@nestjs/common';
import { Track, User, Artist, Album } from 'src/interface';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];

  fav = {
    users: this.users,
  };
}
// npm run test -- test/tracks.e2e.spec.ts
