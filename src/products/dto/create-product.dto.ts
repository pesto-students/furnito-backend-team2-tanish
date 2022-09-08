import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the Product',
    example: 'Oak wood Sofa',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the Product',
    example:
      'This is a very comfortable sofa  is designed for the transitional home. Create some fun memories with your family on this sofa watching a show or simply chatting. It is constructed with a strong solid wood frame and it has PU foam cushions for a comfortable lounging experience.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1500,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Array of Image urls for the product',
    example: [
      'https://res.cloudinary.com/dh8fzzd4h/image/upload/v1662143719/product-4_cqtj3x.png',
      'https://res.cloudinary.com/dh8fzzd4h/image/upload/v1662143719/product-3_le8zvu.png',
    ],
  })
  @IsNotEmpty()
  @IsArray()
  images: [];

  @ApiProperty({
    description: 'The category of the product',
    example: 'Sofa',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The number of available products for sale',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'The user id of the user who created the product',
    example: '63161935d2477d501fa29f1d',
  })
  @IsNotEmpty()
  user: ObjectId;
}
