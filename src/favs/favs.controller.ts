import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllData() {
    return this.favsService.getAllData();
  }

  @Post('/track/:id')
  createTrack(@Param('id') id: string) {
    return this.favsService.createTrack(id);
  }

  @Post('/artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favsService.createArtist(id);
  }

  @Post('/album/:id')
  createAlbums(@Param('id') id: string) {
    return this.favsService.createAlbum(id);
  }

  @HttpCode(204)
  @Delete('/track/:id')
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @HttpCode(204)
  @Delete('/album/:id')
  deleteAlbums(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
