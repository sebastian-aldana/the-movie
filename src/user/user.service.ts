import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { FavoriteMovieService } from '../favorite-movie/favorite-movie.service';

@Injectable()
export class UserService {
  constructor(
    private favoriteMovieService: FavoriteMovieService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newModel = new this.userModel(createUserDto);
    return newModel.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findFavoriteMovies(userId) {
    const userFavoriteMovies =
      this.favoriteMovieService.findFavoriteMovieByUser(userId);
    return userFavoriteMovies;
  }

  findOne(userId: string) {
    return this.userModel.findById(userId);
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }

  remove(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }
}
