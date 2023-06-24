import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieNoteService } from '../movie-note/movie-note.service';

@Injectable()
export class MovieService {
  constructor(
    private movieNoteService: MovieNoteService,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const newModel = new this.movieModel(createMovieDto);
    return newModel.save();
  }

  findAll() {
    return this.movieModel.find().exec();
  }

  findOne(movieId: string) {
    return this.movieModel.findById(movieId);
  }

  findNotes(movieId: string) {
    return this.movieNoteService.findNotesByMovieId(movieId);
  }

  update(movieId: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${movieId} movie`;
  }

  remove(movieId: number) {
    return this.movieModel.findByIdAndDelete(movieId);
  }
}
