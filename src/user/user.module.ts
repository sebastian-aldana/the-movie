import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { FavoriteMovieModule } from '../favorite-movie/favorite-movie.module';
import { MovieNoteModule } from '../movie-note/movie-note.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    FavoriteMovieModule,
    MovieNoteModule,
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
