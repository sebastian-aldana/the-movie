import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { FavoriteMovieModule } from './favorite-movie/favorite-movie.module';
import { MovieNoteModule } from './movie-note/movie-note.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    MovieModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_CONNECTION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    FavoriteMovieModule,
    MovieNoteModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
