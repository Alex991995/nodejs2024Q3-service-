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

  async getAllData() {
    const artists = await this.database.artist.findMany({
      where: { isFavorite: true },
      select: { id: true, name: true, grammy: true },
    });
    const albums = await this.database.album.findMany({
      where: { isFavorite: true },
      select: { id: true, name: true, year: true, artistId: true },
    });
    const tracks = await this.database.track.findMany({
      where: { isFavorite: true },
      select: {
        id: true,
        name: true,
        artistId: true,
        albumId: true,
        duration: true,
      },
    });

    return { artists, albums, tracks };
  }

  async createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findArtist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });

    if (!findArtist) {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateArtist = await this.database.artist.update({
      where: {
        id,
      },
      data: {
        isFavorite: true,
      },
    });
    return updateArtist;
  }

  async deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findArtist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });

    if (!findArtist) {
      throw new HttpException(
        `Invalid artist `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateArtist = await this.database.artist.update({
      where: {
        id,
      },
      data: {
        isFavorite: false,
      },
    });
    return updateArtist;
  }

  async createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findTrack = await this.database.track.findUnique({
      where: {
        id,
      },
    });

    if (!findTrack) {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateTrack = await this.database.track.update({
      where: {
        id,
      },
      data: {
        isFavorite: true,
      },
    });
    return updateTrack;
  }

  async deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findTrack = await this.database.track.findUnique({
      where: {
        id,
      },
    });

    if (!findTrack) {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateTrack = await this.database.track.update({
      where: {
        id,
      },
      data: {
        isFavorite: false,
      },
    });
    return updateTrack;
  }

  async createAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findAlbum = await this.database.album.findUnique({
      where: {
        id,
      },
    });

    if (!findAlbum) {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateAlbum = await this.database.album.update({
      where: {
        id,
      },
      data: {
        isFavorite: true,
      },
    });
    return updateAlbum;
  }

  async deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    const findAlbum = await this.database.album.findUnique({
      where: {
        id,
      },
    });

    if (!findAlbum) {
      throw new HttpException(
        `Invalid track `,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updateAlbum = await this.database.album.update({
      where: {
        id,
      },
      data: {
        isFavorite: false,
      },
    });
    return updateAlbum;
  }

  // deleteTrack(id: string) {
  //   this.database.favorites.tracks = this.database.favorites.tracks.filter(
  //     (track) => track.id !== id,
  //   );
  // }

  // deleteAlbum(id: string) {
  //   this.database.favorites.albums = this.database.favorites.albums.filter(
  //     (album) => album.id !== id,
  //   );
  // }

  // deleteArtist(id: string) {
  //   this.database.favorites.artists = this.database.favorites.artists.filter(
  //     (artist) => artist.id !== id,
  //   );
  // }
}
