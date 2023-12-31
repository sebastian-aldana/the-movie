import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoriteMovieService } from './favorite-movie.service';
import { FavoriteMovieController } from './favorite-movie.controller';
import {
  FavoriteMovie,
  FavoriteMovieSchema,
} from './entities/favorite-movie.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: FavoriteMovie.name,
        schema: FavoriteMovieSchema,
      },
    ]),
  ],
  controllers: [FavoriteMovieController],
  providers: [FavoriteMovieService],
  exports: [FavoriteMovieService],
})
export class FavoriteMovieModule {}
