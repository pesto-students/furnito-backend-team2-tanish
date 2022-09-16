import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'The status of the order',
    example: 'Shipped',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
