import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  checkout(totalAmount: string) {
    return this.stripe.paymentIntents.create({
      amount: Number(totalAmount) * 100,
      currency: 'inr',
      payment_method_types: ['card'],
    });
  }
}
