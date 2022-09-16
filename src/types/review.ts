import { Document } from 'mongoose';

export interface IReview extends Document {
  id: string;
  review: string;
}
