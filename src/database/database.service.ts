import { Injectable, Scope } from '@nestjs/common';
import { Track, User, Artist, Album, FavoritesResponse } from 'src/interface';

@Injectable({ scope: Scope.DEFAULT })
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

  getAlbums() {
    return this.albums;
  }
}
// npm run test -- test/tracks.e2e.spec.ts
