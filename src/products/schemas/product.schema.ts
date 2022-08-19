import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaxLength } from 'class-validator';
import mongoose from 'mongoose';
import { User } from '../../user/user.schema.';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: ['Please enter the product name'], type: String })
  name: string;

  @Prop({ required: ['Please enter the product description'], type: String })
  description: string;

  @Prop({ required: [true, 'Please enter the product price'], type: Number })
  @MaxLength(10, { message: 'Price cannot exceed 8 digits' })
  price: number;

  @Prop()
  image: URL;

  @Prop([String])
  gallery: string[];

  @Prop({ required: [true, 'Please Enter the Product Category'], type: String })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  user: User;

  @Prop({ required: [true, 'Please enter the product quantity'], type: Number })
  quantity: number;
}

export type ProductDocument = Product & mongoose.Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
