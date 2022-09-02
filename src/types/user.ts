import { Document } from 'mongoose';

export interface IAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface IUser extends Document {
  username: string;
  readonly password: string;
  address: IAddress;
  email: string;
  phone: string;
}
