import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  create(createMovieDto: CreateMovieDto) {
    const newModel = new this.movieModel(createMovieDto);
    return newModel.save();
  }

  findAll() {
    return this.movieModel.find().exec();
  }

  findOne(id: string) {
    return this.movieModel.findById(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return this.movieModel.findByIdAndDelete(id);
  }
}
