import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieNoteService } from './movie-note.service';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from './dto/movie-note.dto';

@Controller('movie-note')
export class MovieNoteController {
  constructor(private readonly movieNoteService: MovieNoteService) {}

  @Post(':movieId/userId/:userId')
  create(
    @Param('userId') userId,
    @Param('movieId') movieId,
    @Body() createMovieNoteDto: CreateMovieNoteDto,
  ) {
    return this.movieNoteService.create(movieId, userId, createMovieNoteDto);
  }

  @Get()
  findAll() {
    return this.movieNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieNoteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieNoteDto: UpdateMovieNoteDto,
  ) {
    return this.movieNoteService.update(+id, updateMovieNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieNoteService.remove(+id);
  }
}
