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

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}

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
    console.log('tracks from albums', this.database.tracks);
    const foundedAlbum = this.database.albums.find((album) => album.id === id);

    if (foundedAlbum) {
      this.database.albums = this.database.albums.filter(
        (album) => album.id !== foundedAlbum.id,
      );
      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  removeFromAlbumArtistsId(id: string) {
    console.log(this.database.albums);
    this.database.albums.forEach((album) => {
      console.log('album', album);
      if (album.artistId === id) album.artistId === null;
    });
    // return this.database.albums;
  }
}
