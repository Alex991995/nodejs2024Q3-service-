import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  private readonly logger = new LoggerService(ArtistController.name);

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    try {
      const res = await this.artistService.create(createArtistDto);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(JSON.stringify(createArtistDto), error.stack);
      }
    }
    // const res = await this.artistService.create(createArtistDto);
    // this.logger.log(JSON.stringify(createArtistDto));
    // return res;
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.artistService.remove(id);
    if (result === 204) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
