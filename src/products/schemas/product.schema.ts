import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: ['Please enter the product name'], type: String })
  name: string;

  @Prop({ required: ['Please enter the product description'], type: String })
  description: string;

  @Prop({ required: [true, 'Please enter the product price'], type: String })
  price: number;

  @Prop({ required: ['Please enter the product image'], type: String })
  image: string;

  @Prop({ required: ['Please enter the product category'], type: String })
  category: string;

  @Prop({ required: ['Please enter the product name'], type: String })
  stock: string;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
