import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  getAllData() {
    return this.database.favorites;
  }

  createAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundAlbum = this.database.albums.find((album) => album.id === id);
    if (foundAlbum) {
      this.database.favorites.albums.push(foundAlbum);
      return;
    } else {
      throw new HttpException(
        `Invalid album `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundArtist = this.database.artists.find(
      (artist) => artist.id === id,
    );
    if (foundArtist) {
      this.database.favorites.artists.push(foundArtist);
      return;
    } else {
      throw new HttpException(
        `Invalid Artist `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedTrack = this.database.tracks.find((track) => track.id === id);
    if (foundedTrack) {
      this.database.favorites.tracks.push(foundedTrack);
      return;
    } else {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  deleteTrack(id: string) {
    this.database.favorites.tracks = this.database.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  deleteAlbum(id: string) {
    this.database.favorites.albums = this.database.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  deleteArtist(id: string) {
    this.database.favorites.artists = this.database.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
