import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Cart } from './cart.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + Number(item.quantity) * item.price,
      0,
    );
    const gst = totalPrice * 0.18;
    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100 + gst,
      currency: 'inr',
      payment_method_types: ['card'],
    });
  }
}
