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
      return this.artistService.create(createArtistDto);
    } catch (error) {
      this.logger.error(JSON.stringify(createArtistDto), error.stack);
      throw error;
      // if (error instanceof Error) {
      //   this.logger.error(JSON.stringify(createArtistDto), error.stack);
      // }
    }
  }

  @Get()
  findAll() {
    try {
      return this.artistService.findAll();
    } catch (error) {
      this.logger.error(JSON.stringify(error.message), error.stack);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.artistService.findOne(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error.message), error.stack);
      throw error;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistService.update(id, updateArtistDto);
    } catch (error) {
      this.logger.error(JSON.stringify(updateArtistDto), error.stack);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.artistService.remove(id);
      if (result === 204) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error.message), error.stack);
      throw error;
    }
  }
}
