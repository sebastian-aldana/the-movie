import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieNoteController } from './movie-note.controller';
import { MovieNoteService } from './movie-note.service';
import { MovieNote, MovieNoteSchema } from './entities/movie-note.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: MovieNote.name,
        schema: MovieNoteSchema,
      },
    ]),
  ],
  controllers: [MovieNoteController],
  providers: [MovieNoteService],
  exports: [MovieNoteService],
})
export class MovieNoteModule {}
