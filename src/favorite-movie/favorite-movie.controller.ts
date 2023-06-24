import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteMovieService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteMovieService.remove(id);
  }
}
