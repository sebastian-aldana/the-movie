import { Test, TestingModule } from '@nestjs/testing';
import { MovieNoteService } from './movie-note.service';

describe('MovieNoteService', () => {
  let service: MovieNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieNoteService],
    }).compile();

    service = module.get<MovieNoteService>(MovieNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
