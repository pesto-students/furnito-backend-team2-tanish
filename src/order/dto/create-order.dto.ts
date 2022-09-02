import { IsNotEmpty } from 'class-validator';
import { Cart } from '../../stripe/cart.model';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly cart: Cart;

  @IsNotEmpty()
  readonly total: string;
}
