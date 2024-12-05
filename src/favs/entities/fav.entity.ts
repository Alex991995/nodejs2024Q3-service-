import { Album, Artist, Track } from 'src/interface';

export class Favorites implements FavoritesResponse {
  artists = [];
  albums = [];
  tracks = [];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
