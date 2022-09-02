import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;
}

export type FeedbackDocument = Feedback & Document;
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
