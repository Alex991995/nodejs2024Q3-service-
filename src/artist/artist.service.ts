import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = { ...createArtistDto, id: uuidv4() };

    await this.database.artist.create({
      data: newArtist,
    });

    return newArtist;
  }

  async findAll() {
    return this.database.artist.findMany();
  }

  async findOne(id: string) {
    const uniqueArtist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (uniqueArtist) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('artist not found');
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    try {
      const updatedArtist = await this.database.artist.update({
        where: {
          id,
        },
        data: updateArtistDto,
      });
      return updatedArtist;
    } catch {
      throw new NotFoundException('Artist not found');
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedArtist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });

    // this.database.favorites.artists = this.database.favorites.artists.filter(
    //   (artist) => artist.id !== id,
    // );

    await this.database.album.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });

    await this.database.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });

    if (foundedArtist) {
      // this.database.albums.forEach((album) => {
      //   if (album.artistId === foundedArtist.id) {
      //     album.artistId = null;
      //   }
      // });
      // await this.database.album.update({
      //   where: {
      //     artistId: id,
      //   },
      //   data: {
      //     artistId: null,
      //   },
      // });

      // this.database.tracks.forEach((track) => {
      //   if (track.artistId === foundedArtist.id) {
      //     track.artistId = null;
      //   }
      // });

      await this.database.artist.delete({
        where: {
          id,
        },
      });

      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
