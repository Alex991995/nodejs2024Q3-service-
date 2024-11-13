// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Res,
//   HttpStatus,
//   Put,
// } from '@nestjs/common';
// import { AlbumService } from './album.service';
// import { CreateAlbumDto } from './dto/create-album.dto';
// import { UpdateAlbumDto } from './dto/update-album.dto';
// import { Response } from 'express';

// @Controller('album')
// export class AlbumController {
//   constructor(private readonly albumService: AlbumService) {}

//   @Post()
//   create(@Body() createAlbumDto: CreateAlbumDto) {
//     return this.albumService.create(createAlbumDto);
//   }

//   @Get()
//   findAll() {
//     return this.albumService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.albumService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
//     return this.albumService.update(id, updateAlbumDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string, @Res() res: Response) {
//     const result = this.albumService.remove(id);
//     if (result === 204) {
//       return res.status(HttpStatus.NO_CONTENT).send();
//     }
//   }
// }
