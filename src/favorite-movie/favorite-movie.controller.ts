import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteMovieService } from './favorite-movie.service';
import { CreateFavoriteMovieDto } from './dto/favorite-movie.dto';

@Controller('favorite-movie')
export class FavoriteMovieController {
  constructor(private readonly favoriteMovieService: FavoriteMovieService) {}

  @Post(':userId/movieId/:movieId')
  create(
    @Param('userId') userId,
    @Param('movieId') movieId,
    @Body() createFavoriteMovieDto: CreateFavoriteMovieDto,
  ) {
    return this.favoriteMovieService.create(
      userId,
      movieId,
      createFavoriteMovieDto,
    );
  }

  @Get()
  findAll() {
    return this.favoriteMovieService.findAll();
  }

  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.favoriteMovieService.findOne(movieId);
  }

  @Delete(':movieId')
  remove(@Param('movieId') movieId: string) {
    return this.favoriteMovieService.remove(movieId);
  }
}
