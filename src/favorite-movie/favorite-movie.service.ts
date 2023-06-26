import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ParamsDto } from '../database/dto/params.dto';
import { FavoriteMovie } from './entities/favorite-movie.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavoriteMovieService {
  constructor(
    @InjectModel(FavoriteMovie.name)
    private favoriteMovieModel: Model<FavoriteMovie>,
    private databaseService: DatabaseService,
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

  async findFavoriteMovieByUser(params: ParamsDto, id: string) {
    const { limit, offset, page, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.favoriteMovieModel,
      params,
    );
    const response = this.favoriteMovieModel
      .find({ userId: id, ...query })
      .limit(limit)
      .skip(pagination.skip)
      .populate('movieId')
      .exec();
    return { data: response };
  }

  findOne(movieId: string) {
    return this.favoriteMovieModel.findById(movieId).populate('movieId').exec();
  }

  remove(movieId: string) {
    return this.favoriteMovieModel.findByIdAndDelete(movieId);
  }
}
