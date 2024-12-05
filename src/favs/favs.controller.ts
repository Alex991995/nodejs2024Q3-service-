import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllData() {
    return this.favsService.getAllData();
  }

  @HttpCode(201)
  @Post('/track/:id')
  createTrack(@Param('id') id: string) {
    return this.favsService.createTrack(id);
  }

  @HttpCode(204)
  @Delete('/track/:id')
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @HttpCode(201)
  @Post('/artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favsService.createArtist(id);
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @HttpCode(201)
  @Post('/album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favsService.createAlbum(id);
  }

  @HttpCode(204)
  @Delete('/album/:id')
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
