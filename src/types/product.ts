import { IUser } from './user';

export interface IProduct {
  owner: IUser | string;
  name: string;
  description: string;
  price: number;
  image: string;
}
