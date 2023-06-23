import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsNumber()
  readonly movieApiId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly movieIMDBId: number;

  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @IsNotEmpty()
  @IsArray()
  readonly genres: string[];

  @IsNotEmpty()
  @IsString()
  readonly originalLanguaje: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly overview: string;

  readonly popularity: number;

  @IsNotEmpty()
  @IsString()
  readonly posterPath: string;

  @IsNotEmpty()
  @IsString()
  readonly releaseDate: string;

  @IsNotEmpty()
  @IsString()
  readonly video: string;

  readonly voteCoverage: number;
  readonly voteCount: number;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
