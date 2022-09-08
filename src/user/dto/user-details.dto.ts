import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDetailsDto {
  @ApiProperty({
    description: 'The id of the User',
    example: '63161935d2477d501fa29f1d',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The name of the User',
    example: 'Vasu Vallabh',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
