import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

class ShippingInfo {
  @ApiProperty({
    description: 'The name of the person who will receive the order',
    example: 'Vasu Vallabh',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the person who will receive the order',
    example: 'vasu123@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The address of the person who will receive the order',
    example: 'House 1, Block 2, Street 3, Area 4',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The City of the person who will receive the order',
    example: 'Bhubaneswar',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The State of the person who will receive the order',
    example: 'Odisha',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The Country of the person who will receive the order',
    example: 'India',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The Pin code of the person who will receive the order',
    example: '751001',
  })
  @IsString()
  @IsNotEmpty()
  pinCode: string;

  @ApiProperty({
    description: 'The Phone Number of the person who will receive the order',
    example: '+917978120295',
  })
  @IsPhoneNumber('IN', { message: 'Phone number is not valid' })
  @IsNotEmpty()
  phoneNo: number;
}

class OrderedItem {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Oak Wood Sofa',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1000.0,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 2,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'The image of the product',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The id of the product',
    example: '5f9f5b9b9b9b9b9b9b9b9b9b',
  })
  @IsNotEmpty()
  product: ObjectId;
}

class PaymentInfo {
  @ApiProperty({
    description: 'The id of the payment',
    example: '5f9f5b9b9b9b9b9b9b9b9b9b',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The status of the payment',
    example: 'success',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class CreateOrderDto {
  @ApiProperty({
    type: ShippingInfo,
  })
  readonly shippingInfo: ShippingInfo;

  @ApiProperty({
    type: [OrderedItem],
  })
  readonly orderedItems: OrderedItem[];

  @ApiProperty({
    type: PaymentInfo,
  })
  readonly paymentInfo: PaymentInfo;

  @ApiProperty({
    description: 'The total price of the items',
    example: 2000.0,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly itemsPrice: number;

  @ApiProperty({
    description: 'The shipping price of the items',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly shippingPrice: number;

  @ApiProperty({
    description: 'The tax price of the items',
    example: 180.0,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly taxPrice: number;

  @ApiProperty({
    description: 'The total price of the items',
    example: 2280.0,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @ApiProperty({
    description: 'The status of the order',
    example: 'Processing',
  })
  @IsString()
  @IsNotEmpty()
  readonly orderStatus: string;

  @ApiProperty({
    description: 'The user id of the user who created the product',
    example: '63161935d2477d501fa29f1d',
  })
  @IsNotEmpty()
  user: ObjectId;
}
