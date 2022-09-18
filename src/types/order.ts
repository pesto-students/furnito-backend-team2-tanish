import { Document } from 'mongoose';
import { IUser } from './user';
import { Cart } from '../stripe/cart.model';

export interface IOrder extends Document {
  user: any;
  cart: any;
  total: any;
  createdAt: Date;
  updatedAt: Date;
}
