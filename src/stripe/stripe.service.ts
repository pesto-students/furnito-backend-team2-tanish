import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequestBody } from './payment-request-body.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  checkout(payment: PaymentRequestBody) {
    const totalPrice = payment.products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: totalPrice,
      currency: payment.currency, // set currency
      payment_method_types: ['card'],
    });
  }
}
