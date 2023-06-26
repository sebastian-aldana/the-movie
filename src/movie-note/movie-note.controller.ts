import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MovieNoteService } from './movie-note.service';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from './dto/movie-note.dto';
import { ParamsDto } from '../database/dto/params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Public } from '../decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Movie Note')
@Controller('movie-note')
export class MovieNoteController {
  constructor(private readonly movieNoteService: MovieNoteService) {}

  @Post(':movieId/userId/:userId')
  @ApiOperation({
    summary: 'Movie note creation service for adding a new note to a movie',
  })
  create(
    @Param('userId') userId,
    @Param('movieId') movieId,
    @Body() createMovieNoteDto: CreateMovieNoteDto,
  ) {
    return this.movieNoteService.create(movieId, userId, createMovieNoteDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary:
      'All notes retrieval service for fetching all notes from the database',
  })
  findAll(@Query() params: ParamsDto) {
    return this.movieNoteService.findAll(params);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary:
      'Single note retrieval service for fetching a specific note by its ID',
  })
  findOne(@Param('id') id: string) {
    return this.movieNoteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Note update service for modifying and updating a specific note by its ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateMovieNoteDto: UpdateMovieNoteDto,
  ) {
    return this.movieNoteService.update(+id, updateMovieNoteDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Note deletion service for removing a specific note by its ID',
  })
  remove(@Param('id') id: string) {
    return this.movieNoteService.remove(+id);
  }
}
