export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface TokenPayload {
  userId: string;
  login: string;
}
