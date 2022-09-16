import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout(@Body() body: { total: string }) {
    try {
      return this.stripeService.checkout(body.total);
    } catch (error) {
      return error;
    }
  }
}
