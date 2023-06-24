import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'movies' })
export class Movie extends Document {
  @Prop({ required: true })
  movieApiId: number;
  @Prop({ required: true })
  movieIMDBId: number;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  genres: string[];

  @Prop({ required: true })
  originalLanguaje: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  overview: string;

  popularity: number;

  @Prop({ required: true })
  posterPath: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  video: string;

  voteCoverage: number;
  voteCount: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
