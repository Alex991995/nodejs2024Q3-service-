// import {
//   BadRequestException,
//   HttpStatus,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { CreateTrackDto } from './dto/create-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
// import { DatabaseService } from 'src/database/database.service';
// import { v4 as uuidv4 } from 'uuid';
// import { validate as uuidValidate } from 'uuid';

// @Injectable()
// export class TrackService {
//   constructor(private database: DatabaseService) {}

//   create(createTrackDto: CreateTrackDto) {
//     const newTrack = { ...createTrackDto, id: uuidv4() };
//     this.database.tracks.push(newTrack);
//     return newTrack;
//   }

//   findAll() {
//     return this.database.tracks;
//   }

//   findOne(id: string) {
//     if (!uuidValidate(id)) {
//       throw new BadRequestException('invalid id');
//     } else if (this.database.tracks.some((track) => track.id === id)) {
//       return HttpStatus.OK;
//     }

//     throw new NotFoundException('artist not found');
//   }

//   update(id: string, updateTrackDto: UpdateTrackDto) {
//     if (!uuidValidate(id)) {
//       throw new BadRequestException('invalid id');
//     }

//     let foundedTrack = this.database.tracks.find((track) => track.id === id);
//     if (foundedTrack) {
//       foundedTrack = { ...foundedTrack, ...updateTrackDto };
//       return foundedTrack;
//     }
//     throw new NotFoundException('track not found');
//   }

//   remove(id: string) {
//     if (!uuidValidate(id)) {
//       throw new BadRequestException('invalid id');
//     }
//     const foundedTrack = this.database.tracks.find((track) => track.id === id);

//     this.database.favorites.tracks = this.database.favorites.tracks.filter(
//       (track) => track.id !== id,
//     );

//     if (foundedTrack) {
//       this.database.tracks = this.database.tracks.filter(
//         (track) => track.id !== foundedTrack.id,
//       );
//       return HttpStatus.NO_CONTENT;
//     } else {
//       throw new NotFoundException('Track not found');
//     }
//   }

//   setNull(id: string) {
//     this.database.tracks.forEach((track) => {
//       if (track.albumId === id) {
//         track.albumId = null;
//       }
//     });
//   }
// }
