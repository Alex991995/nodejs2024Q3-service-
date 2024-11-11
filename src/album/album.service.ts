import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private database: DatabaseService,
    private trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { ...createAlbumDto, id: uuidv4() };
    this.database.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.database.albums;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (this.database.albums.some((album) => album.id === id)) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('artist not found');
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    let foundedAlbum = this.database.albums.find((album) => album.id === id);
    if (foundedAlbum) {
      foundedAlbum = { ...foundedAlbum, ...updateAlbumDto };
      return foundedAlbum;
    }
    throw new NotFoundException('album not found');
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedAlbum = this.database.albums.find((album) => album.id === id);

    this.database.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.database.favorites.albums = this.database.favorites.albums.filter(
      (album) => album.id !== id,
    );

    if (foundedAlbum) {
      this.database.albums = this.database.albums.filter(
        (album) => album.id !== foundedAlbum.id,
      );

      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('album not found');
    }
  }
}
