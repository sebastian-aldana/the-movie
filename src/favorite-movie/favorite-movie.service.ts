import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ParamsDto } from '../database/dto/params.dto';
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

  findFavoriteMovieByUser(params: ParamsDto, id: string) {
    const { limit, offset, ...query } = params;
    return this.favoriteMovieModel
      .find({ userId: id, ...query })
      .limit(limit)
      .skip(offset)
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
