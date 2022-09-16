import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductReviewDto {
  @ApiProperty({
    description: 'Rating for the product',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Review for the product',
    example: 'This is a very comfortable sofa',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'The id of the product',
    example: '6316b2d25456abbefce6bfbf',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
