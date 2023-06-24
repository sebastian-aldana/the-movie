import { Test, TestingModule } from '@nestjs/testing';
import { MovieNoteController } from './movie-note.controller';
import { MovieNoteService } from './movie-note.service';

describe('MovieNoteController', () => {
  let controller: MovieNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieNoteController],
      providers: [MovieNoteService],
    }).compile();

    controller = module.get<MovieNoteController>(MovieNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
