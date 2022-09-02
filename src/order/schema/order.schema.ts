import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: JSON })
  cart: JSON;

  @Prop({ required: true, type: String })
  total: string;

  @Prop({ default: 'Pending', type: String })
  status: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
