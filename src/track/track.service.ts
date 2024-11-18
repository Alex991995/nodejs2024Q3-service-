import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = { ...createTrackDto, id: uuidv4() };

    await this.database.track.create({
      data: newTrack,
    });
    return newTrack;
  }

  findAll() {
    return this.database.track.findMany();
  }

  async findOne(id: string) {
    const uniqueTrack = await this.database.track.findUnique({
      where: {
        id,
      },
    });
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    } else if (uniqueTrack) {
      return HttpStatus.OK;
    }

    throw new NotFoundException('Track not found');
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }

    try {
      const foundedTrack = await this.database.track.update({
        where: {
          id,
        },
        data: updateTrackDto,
      });
      return foundedTrack;
    } catch {
      throw new NotFoundException('album not found');
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    try {
      await this.database.track.delete({
        where: {
          id,
        },
      });
      return HttpStatus.NO_CONTENT;
    } catch {
      throw new NotFoundException('Track not found');
    }
  }
}
