import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateMovieNoteDto {
  @IsNotEmpty()
  @IsString()
  readonly noteTitle: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class UpdateMovieNoteDto extends PartialType(CreateMovieNoteDto) {}
