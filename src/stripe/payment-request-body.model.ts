import { Product } from '../products/schemas/product.schema';

export interface PaymentRequestBody {
  products: Product[];
  currency: string;
}
