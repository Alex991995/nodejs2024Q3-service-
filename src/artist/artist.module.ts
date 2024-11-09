import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseService } from 'src/database/database.service';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService, AlbumService],
})
export class ArtistModule {}
