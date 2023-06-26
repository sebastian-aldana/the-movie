import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class ParamsDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit = 10;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset = 0;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  page = 1;

  [key: string]: any;
}
