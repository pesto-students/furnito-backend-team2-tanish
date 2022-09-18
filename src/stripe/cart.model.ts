import { ProductDocument } from '../products/schemas/product.schema';

interface CartItem extends ProductDocument {
  quantity: string;
  _id: string;
  __v: number;
}

export type Cart = CartItem[];
