import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  productId: string;

  @IsString()
  rating: number;
}
