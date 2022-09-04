import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
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
    maxlength: [8, 'Price cannot be more than 8 characters'],
    type: Number,
  })
  price: number;

  @Prop({
    type: Number,
    default: 0,
  })
  rating: number;

  images: [
    {
      url: {
        type: string;
        required: true;
      };
    },
  ];

  @Prop({
    required: [true, 'Please enter product category'],
    type: String,
  })
  category: string;

  @Prop({
    default: 0,
    required: [true, 'Please enter product category'],
    maxlength: [5, 'Stock cannot be more than 5 characters'],
    type: Number,
  })
  stock: number;

  @Prop({
    default: 0,
  })
  numOfReviews: number;

  reviews: [
    {
      user: {
        type: Types.ObjectId;
        ref: 'User';
        required: true;
      };
      name: {
        type: string;
        required: true;
      };
      rating: {
        type: number;
        required: true;
      };
      comment: {
        type: string;
        required: true;
      };
    },
  ];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
