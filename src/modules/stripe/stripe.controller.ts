import { Body, Controller, Post, Req } from '@nestjs/common';
import { StripeService } from '@/modules/stripe/stripe.service';
import { CreateCheckoutSessionDto } from '@/modules/stripe/dtos/create-checkout-session.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('subscription')
  async createCheckoutSession(@Body() data: CreateCheckoutSessionDto) {
    return this.stripeService.createCheckoutSession(data);
  }
}
