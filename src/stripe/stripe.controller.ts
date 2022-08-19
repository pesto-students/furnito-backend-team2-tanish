import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentRequestBody } from './payment-request-body.model';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout(@Body() body: PaymentRequestBody) {
    try {
      return this.stripeService.checkout(body);
    } catch (error) {
      return error;
    }
  }
}
