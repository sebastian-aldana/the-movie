import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.movieService.findOne(movieId);
  }

  @Get(':movieId/notes')
  findNotes(@Param('movieId') movieId: string) {
    return this.movieService.findNotes(movieId);
  }

  @Patch(':movieId')
  update(
    @Param('movieId') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(movieId, updateMovieDto);
  }

  @Delete(':movieId')
  remove(@Param('movieId') movieId: string) {
    return this.movieService.remove(+movieId);
  }
}
