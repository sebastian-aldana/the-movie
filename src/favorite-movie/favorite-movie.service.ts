import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FavoriteMovie } from './entities/favorite-movie.entity';

@Injectable()
export class FavoriteMovieService {
  constructor(
    @InjectModel(FavoriteMovie.name)
    private favoriteMovieModel: Model<FavoriteMovie>,
  ) {}

  create(userId, movieId) {
    const newModel = new this.favoriteMovieModel({
      userId,
      movieId,
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

  findFavoriteMovieByUser(id: string) {
    return this.favoriteMovieModel
      .find({ userId: id })
      .populate('movieId')
      .exec();
  }

  findOne(movieId: string) {
    return this.favoriteMovieModel.findById(movieId).populate('movieId').exec();
  }

  remove(movieId: string) {
    return this.favoriteMovieModel.findByIdAndDelete(movieId);
  }
}
