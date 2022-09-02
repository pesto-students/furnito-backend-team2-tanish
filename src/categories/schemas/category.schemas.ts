import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: ['Please enter the category name'], type: String })
  name: string;

  @Prop({ required: ['Please enter the category image'], type: Array })
  image: Array<string>;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
