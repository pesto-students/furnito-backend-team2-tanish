import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: String, required: true },
      phoneNo: { type: Number, required: true },
    },
  })
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNo: number;
  };

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        product: { type: Mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
  })
  orderedItems: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: Mongoose.Schema.Types.ObjectId;
  }[];

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  })
  user: Mongoose.Schema.Types.ObjectId;

  @Prop({
    type: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
  })
  paymentInfo: {
    id: string;
    status: string;
  };

  @Prop({
    type: Date,
    default: Date.now,
  })
  paidAt: Date;

  @Prop({
    type: Number,
    required: true,
    default: 0.0,
  })
  itemsPrice: number;

  @Prop({
    type: Number,
    required: true,
    default: 0.0,
  })
  taxPrice: number;

  @Prop({
    type: Number,
    required: true,
    default: 0.0,
  })
  shippingPrice: number;

  @Prop({
    type: Number,
    required: true,
    default: 0.0,
  })
  totalPrice: number;

  @Prop({
    type: String,
    required: true,
    default: 'Processing',
  })
  orderStatus: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
