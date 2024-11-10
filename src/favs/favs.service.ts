import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  getAllData() {
    console.log(this.database.users);
    // return this.database.fav;
  }

  addTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('invalid id');
    }
    // console.log(this.database.tracks);
    const foundedTrack = this.database.tracks.find((track) => track.id === id);

    if (foundedTrack) {
      // this.database.fav.tracks.push(foundedTrack);
      return 'track was added to the favorite section';
    }
    throw new NotFoundException('track not found');
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
