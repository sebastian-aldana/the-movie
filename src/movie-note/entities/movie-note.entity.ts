import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Movie } from '../../movie/entities/movie.entity';
import { User } from '../../user/entities/user.entity';

@Schema({ timestamps: true, collection: 'movieNotes' })
export class MovieNote extends Document {
  @Prop({ type: Types.ObjectId, ref: Movie.name, required: true })
  movieId: string;

  @Prop({ required: true, unique: true })
  noteTitle: string;

  @Prop({ required: true })
  description: string;
}

export const MovieNoteSchema = SchemaFactory.createForClass(MovieNote);
