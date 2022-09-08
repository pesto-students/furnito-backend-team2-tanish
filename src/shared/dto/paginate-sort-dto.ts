import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
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
  limit: number;

  @ApiProperty({
    description: 'The field to sort by',
    example: 'name',
  })
  @IsNotEmpty()
  sortBy: string;

  @ApiProperty({
    description: 'Order of sorting',
    example: 'desc',
  })
  @IsNotEmpty()
  sortOrder: 'asc';

  @ApiProperty({
    description: 'filter name',
    example: 'Oak',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}
