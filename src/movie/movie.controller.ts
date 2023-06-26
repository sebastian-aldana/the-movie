import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { ParamsDto } from '../database/dto/params.dto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({
    summary: 'Movie creation service for adding a new movie to the database',
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'All movies retrieval service for fetching all movies from the database',
  })
  findAll(@Query() params: ParamsDto) {
    return this.movieService.findAll(params);
  }

  @Get(':movieId')
  @ApiOperation({
    summary:
      'Single movie retrieval service for fetching a specific movie by its ID',
  })
  findOne(@Param('movieId') movieId: string) {
    return this.movieService.findOne(movieId);
  }

  @Get(':movieId/notes')
  @ApiOperation({
    summary:
      'Movie notes retrieval service for fetching all notes associated with a specific movie',
  })
  findNotes(@Query() params: ParamsDto, @Param('movieId') movieId: string) {
    return this.movieService.findNotes(params, movieId);
  }

  @Patch(':movieId')
  @ApiOperation({
    summary: 'Movie update service for modifying and updating a specific movie',
  })
  update(
    @Param('movieId') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(movieId, updateMovieDto);
  }

  @Delete(':movieId')
  @ApiOperation({
    summary:
      'Movie deletion service for removing a specific movie and its associated data',
  })
  remove(@Param('movieId') movieId: string) {
    return this.movieService.remove(+movieId);
  }
}
