import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the User',
    example: 'Vasu Vallabh',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'vasu.vallabh@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin || user',
  })
  @IsOptional()
  @ValidateIf((o) => o.role === 'admin' || o.role === 'user')
  role: string;
}
