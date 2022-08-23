import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  page: number;

  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  limit: string;

  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  sortBy: string;

  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  sortOrder: 'asc' | 'desc';
}
