import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FavoriteMovieService } from './favorite-movie.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Public } from '../decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Favorite Movie')
@Controller('favorite-movie')
export class FavoriteMovieController {
  constructor(private readonly favoriteMovieService: FavoriteMovieService) {}

  @Post(':userId/movieId/:movieId')
  @ApiOperation({
    summary: `Favorite movie creation service for adding a movie to a user's favorites list using the movie ID and user ID`,
  })
  create(@Param('userId') userId, @Param('movieId') movieId) {
    return this.favoriteMovieService.create(userId, movieId);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: `All favorite movies retrieval service for fetching all movies from a user's favorites list`,
  })
  findAll() {
    return this.favoriteMovieService.findAll();
  }

  @Public()
  @Get(':movieId')
  @ApiOperation({
    summary: `Favorite movie retrieval service for fetching a specific movie from a user's favorites list by its ID`,
  })
  findOne(@Param('movieId') movieId: string) {
    return this.favoriteMovieService.findOne(movieId);
  }

  @Delete(':movieId')
  @ApiOperation({
    summary: `Favorite movie deletion service for removing a specific movie from a user's favorites`,
  })
  remove(@Param('movieId') movieId: string) {
    return this.favoriteMovieService.remove(movieId);
  }
}
