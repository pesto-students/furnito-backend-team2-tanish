import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  shippingInfo: {
    address: {
      type: string;
      required: true;
    };
    city: {
      type: string;
      required: true;
    };
    state: {
      type: string;
      required: true;
    };
    country: {
      type: string;
      required: true;
    };
    pinCode: {
      type: string;
      required: true;
    };
    phoneNo: {
      type: number;
      required: true;
    };
  };

  orderedItems: [
    {
      name: {
        type: string;
        required: true;
      };
      price: {
        type: number;
        required: true;
      };
      quantity: {
        type: number;
        required: true;
      };
      image: {
        type: string;
        required: true;
      };
      product: {
        type: Types.ObjectId;
        ref: 'Product';
        required: true;
      };
    },
  ];

  user: {
    type: Types.ObjectId;
    ref: 'User';
    required: true;
  };

  paymentInfo: {
    id: {
      type: string;
      required: true;
    };
    status: {
      type: string;
      required: true;
    };
  };

  paidAt: {
    type: Date;
    required: true;
  };

  itemsPrice: {
    type: number;
    required: true;
    default: 0.0;
  };

  taxPrice: {
    type: number;
    required: true;
    default: 0.0;
  };

  shippingPrice: {
    type: number;
    required: true;
    default: 0.0;
  };

  totalPrice: {
    type: number;
    required: true;
    default: 0.0;
  };

  orderStatus: {
    type: string;
    required: true;
    default: 'Processing';
  };

  deliveredAt: {
    type: Date;
  };
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
