import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ParamsDto } from '../database/dto/params.dto';
import { User } from './entities/user.entity';
import { FavoriteMovieService } from '../favorite-movie/favorite-movie.service';
import { MovieNoteService } from '../movie-note/movie-note.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(
    private favoriteMovieService: FavoriteMovieService,
    private movieNoteService: MovieNoteService,
    private databaseService: DatabaseService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;
    const newModel = new this.userModel(createUserDto);
    return newModel.save();
  }

  async findAll(params: ParamsDto) {
    const { limit, offset, page, ...query } = params;
    const pagination = await this.databaseService.pagination(
      this.userModel,
      params,
    );
    const response = await this.userModel
      .find({ ...query })
      .limit(limit)
      .skip(pagination.skip)
      .exec();
    return { ...pagination, data: response };
  }

  findFavoriteMovies(params: ParamsDto, userId) {
    return this.favoriteMovieService.findFavoriteMovieByUser(params, userId);
  }

  findNotes(params: ParamsDto, userId) {
    return this.movieNoteService.findNotesByUserId(params, userId);
  }

  findOne(userId: string) {
    return this.userModel.findById(userId);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }

  remove(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }
}
