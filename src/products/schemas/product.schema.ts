import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as Mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema.';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({
    required: [true, 'Please enter the product name'],
    trim: true,
    type: String,
  })
  name: string;

  @Prop({
    required: [true, 'Please enter the product description'],
    type: String,
  })
  description: string;

  @Prop({
    required: [true, 'Please enter the product description'],
    type: Number,
  })
  price: number;

  @Prop({
    type: Array<URL>(),
    required: [true, 'Please enter the product images'],
  })
  images: [];

  @Prop({
    required: [true, 'Please enter product category'],
    type: String,
  })
  category: string;

  @Prop({
    default: 0,
    required: [true, 'Please enter product category'],
    type: Number,
  })
  stock: number;

  @Prop({
    default: 0,
  })
  numOfReviews: number;

  @Prop({
    type: [
      {
        user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        rating: Number,
        comment: String,
      },
    ],
  })
  reviews: {
    user: Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
  }[];

  @Prop({
    default: 0,
  })
  ratings: number;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  })
  user: Mongoose.Schema.Types.ObjectId;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
