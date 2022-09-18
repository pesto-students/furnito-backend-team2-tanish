import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class NewUserDTO {
  @ApiProperty({
    description: 'The name of the User',
    example: 'Vasu Vallabh',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'vasu.vallabh@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}
