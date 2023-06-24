import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFavoriteMovieDto } from './dto/favorite-movie.dto';
import { FavoriteMovie } from './entities/favorite-movie.entity';

@Injectable()
export class FavoriteMovieService {
  constructor(
    @InjectModel(FavoriteMovie.name)
    private favoriteMovieModel: Model<FavoriteMovie>,
  ) {}

  create(userId, movieId, createFavoriteMovieDto: CreateFavoriteMovieDto) {
    const newModel = new this.favoriteMovieModel({
      userId,
      movieId,
      ...createFavoriteMovieDto,
    });
    return newModel.save();
  }

  findAll() {
    return this.favoriteMovieModel
      .find()
      .populate('movieId')
      .populate('userId')
      .exec();
  }

  findOne(id: string) {
    return this.favoriteMovieModel
      .findById(id)
      .populate('movieId')
      .populate('userId');
  }

  remove(id: string) {
    return this.favoriteMovieModel.findByIdAndDelete(id);
  }
}
