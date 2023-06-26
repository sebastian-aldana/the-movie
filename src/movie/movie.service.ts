import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieNoteService } from '../movie-note/movie-note.service';
import { ParamsDto } from '../database/dto/params.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private movieNoteService: MovieNoteService,
    private databaseService: DatabaseService,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const newModel = new this.movieModel(createMovieDto);
    return newModel.save();
  }

  async findAll(params: ParamsDto) {
    const { limit, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.movieModel,
      params,
    );
    return this.movieModel
      .find({ ...query })
      .limit(limit)
      .skip(pagination.skip)
      .exec();
  }

  findOne(movieId: string) {
    return this.movieModel.findById(movieId);
  }

  findNotes(params: ParamsDto, movieId: string) {
    return this.movieNoteService.findNotesByMovieId(params, movieId);
  }

  update(movieId: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${movieId} movie`;
  }

  remove(movieId: number) {
    return this.movieModel.findByIdAndDelete(movieId);
  }
}
