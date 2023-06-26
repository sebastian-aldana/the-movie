import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MovieNote } from './entities/movie-note.entity';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from './dto/movie-note.dto';
import { ParamsDto } from '../database/dto/params.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MovieNoteService {
  constructor(
    private databaseService: DatabaseService,
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

  async findAll(params: ParamsDto) {
    const { limit, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.movieNote,
      params,
    );
    return this.movieNote
      .find({ ...query })
      .limit(limit)
      .skip(pagination.skip)
      .populate('movieId')
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} movieNote`;
  }

  async findNotesByUserId(params: ParamsDto, userId: string) {
    const { limit, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.movieNote,
      params,
    );
    const response = await this.movieNote
      .find({ userId, ...query })
      .limit(limit)
      .skip(pagination.skip)
      .populate('movieId')
      .exec();
    return { ...pagination, data: response };
  }

  async findNotesByMovieId(params: ParamsDto, movieId: string) {
    const { limit, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.movieNote,
      params,
    );
    return this.movieNote
      .find({ movieId, ...query })
      .limit(limit)
      .skip(pagination.skip)
      .exec();
  }

  update(id: number, updateMovieNoteDto: UpdateMovieNoteDto) {
    return `This action updates a #${id} movieNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieNote`;
  }
}
