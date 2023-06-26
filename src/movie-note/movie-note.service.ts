import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MovieNote } from './entities/movie-note.entity';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from './dto/movie-note.dto';
import { ParamsDto } from '../database/dto/params.dto';

@Injectable()
export class MovieNoteService {
  constructor(
    @InjectModel(MovieNote.name) private movieNote: Model<MovieNote>,
  ) {}

  create(movieId, userId, createMovieNoteDto: CreateMovieNoteDto) {
    const newModel = new this.movieNote({
      userId,
      movieId,
      ...createMovieNoteDto,
    });
    return newModel.save();
  }

  findAll() {
    return this.movieNote.find().populate('movieId').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} movieNote`;
  }

  findNotesByUserId(params: ParamsDto, userId: string) {
    const { limit, offset, ...query } = params;
    return this.movieNote
      .find({ userId, ...query })
      .limit(limit)
      .skip(offset)
      .populate('movieId')
      .exec();
  }

  findNotesByMovieId(movieId: string) {
    return this.movieNote.find({ movieId }).exec();
  }

  update(id: number, updateMovieNoteDto: UpdateMovieNoteDto) {
    return `This action updates a #${id} movieNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieNote`;
  }
}
