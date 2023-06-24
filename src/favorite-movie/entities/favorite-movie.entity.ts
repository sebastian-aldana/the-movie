import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Movie } from '../../movie/entities/movie.entity';
import { User } from '../../user/entities/user.entity';

@Schema({ timestamps: true, collection: 'favoritemovies' })
export class FavoriteMovie extends Document {
  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true })
  movieId: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: string;
}

export const FavoriteMovieSchema = SchemaFactory.createForClass(FavoriteMovie);
