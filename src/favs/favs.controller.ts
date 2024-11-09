import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllData() {
    return this.favsService.getAllData();
  }

  @Post('/track/:id')
  create(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favsService.remove(+id);
  }
}
