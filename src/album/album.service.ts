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

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { ...createAlbumDto, id: uuidv4() };
    await this.database.album.create({
      data: newAlbum,
    });
    return newAlbum;
  }

  findAll() {
    return this.database.album.findMany();
  }

  async findOne(id: string) {
    const uniqueAlbum = await this.database.album.findUnique({
      where: {
        id,
      },
    });

    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (uniqueAlbum) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('artist not found');
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    try {
      const foundedAlbum = await this.database.album.update({
        where: {
          id,
        },
        data: updateAlbumDto,
      });
      return foundedAlbum;
    } catch {
      throw new NotFoundException('album not found');
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    const foundedAlbum = await this.database.album.findUnique({
      where: {
        id,
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

    // this.database.favorites.albums = this.database.favorites.albums.filter(
    //   (album) => album.id !== id,
    // );

    if (foundedAlbum) {
      await this.database.album.delete({
        where: {
          id,
        },
      });

      return HttpStatus.NO_CONTENT;
    } else {
      throw new NotFoundException('album not found');
    }
  }
}
