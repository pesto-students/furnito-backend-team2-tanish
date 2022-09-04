import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  @IsNotEmpty()
  @IsString()
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  @IsNotEmpty()
  @IsString()
  limit: number;

  @ApiProperty({
    description: 'The field to sort by',
    example: 'name',
  })
  @IsNotEmpty()
  @IsString()
  sortBy: string;

  @ApiProperty({
    description: 'The sort order',
    example: 'asc | desc',
  })
  @IsNotEmpty()
  @IsString()
  sortOrder: 'asc' | 'desc';
}
