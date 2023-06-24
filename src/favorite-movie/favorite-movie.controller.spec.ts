import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMovieController } from './favorite-movie.controller';
import { FavoriteMovieService } from './favorite-movie.service';

describe('FavoriteMovieController', () => {
  let controller: FavoriteMovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteMovieController],
      providers: [FavoriteMovieService],
    }).compile();

    controller = module.get<FavoriteMovieController>(FavoriteMovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
