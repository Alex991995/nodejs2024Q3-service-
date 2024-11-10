import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = { ...createArtistDto, id: uuidv4() };
    this.database.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.database.artists;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (this.database.artists.some((artist) => artist.id === id)) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('artist not found');
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    let foundedArtist = this.database.artists.find(
      (artist) => artist.id === id,
    );
    if (foundedArtist) {
      foundedArtist = { ...foundedArtist, ...updateArtistDto };
      return foundedArtist;
    }
    throw new NotFoundException('Artist not found');
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedArtist = this.database.artists.find(
      (artist) => artist.id === id,
    );
    console.log('album', this.database.albums);
    // console.log('album from artist', this.database.albums);
    if (foundedArtist) {
      this.database.artists = this.database.artists.filter(
        (artist) => artist.id !== foundedArtist.id,
      );
      // this.albumService.removeFromAlbumArtistsId(id);
      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  //   if (!validate(id)) throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  //   if (!this.database.artist.has(id)) throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

  //   const artist = this.database.artist.get(id);

  //   Array.from(this.database.album.values()).forEach((album) => {
  //     if (album.artistId === artist.id) {
  //       album.artistId = null;
  //     }
  //   });

  //   Array.from(this.database.track.values()).forEach((track) => {
  //     if (track.artistId === artist.id) {
  //       track.artistId = null;
  //     }
  //   });

  //   const favIndex = this.database.favorites.artists.indexOf(id);
  //   if (favIndex > -1) {
  //     this.database.favorites.artists.splice(favIndex, 1);
  //   }

  //   this.database.artist.delete(artist.id);
  //   return null;
  // }
}
