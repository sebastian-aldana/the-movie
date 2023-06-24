import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMovieService } from './favorite-movie.service';

describe('FavoriteMovieService', () => {
  let service: FavoriteMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteMovieService],
    }).compile();

    service = module.get<FavoriteMovieService>(FavoriteMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
