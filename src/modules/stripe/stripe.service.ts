import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config } from '@/modules/stripe/config';
import { CreateStripeCustomerDto } from '@/modules/stripe/dtos/create-stripe-customer.dto';
import { CreateCheckoutSessionDto } from '@/modules/stripe/dtos/create-checkout-session.dto';
import { UpdateStripeDto } from '@/modules/user/dtos/update-stripe.dto';
import { UserService } from '@/modules/user/user.service';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-10-28.acacia',
});

@Injectable()
export class StripeService {
  constructor(private readonly userService: UserService) {}

  async createStripeCustomer(input: CreateStripeCustomerDto) {
    const customer = await this.getStripeCustomerByEmail(input.email);

    if (customer) return customer;

    const createdCustomer = await stripe.customers.create({
      email: input.email,
      name: input.name,
    });

    await stripe.subscriptions.create({
      customer: createdCustomer.id,
      items: [{ price: config.stripe.plans.free.priceId }],
    });

    return createdCustomer;
  }

  async getStripeCustomerByEmail(email: string) {
    const customers = await stripe.customers.list({
      email,
    });

    return customers.data[0];
  }

  async createCheckoutSession({
    userEmail,
    userStripeSubscriptionId,
  }: CreateCheckoutSessionDto) {
    try {
      const customer = await this.createStripeCustomer({
        email: userEmail,
      });

      const subscription = await stripe.subscriptionItems.list({
        subscription: userStripeSubscriptionId,
        limit: 1,
      });

      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${process.env.BASE_URL}/settings/subscription`,
        flow_data: {
          type: 'subscription_update_confirm',
          after_completion: {
            type: 'redirect',
            redirect: {
              return_url: `${process.env.BASE_URL}/settings/subscription?success=true`,
            },
          },
          subscription_update_confirm: {
            subscription: userStripeSubscriptionId,
            items: [
              {
                id: subscription.data[0].id,
                price: config.stripe.plans.pro.priceId,
                quantity: 1,
              },
            ],
          },
        },
      });

      return {
        url: session.url,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Error creating checkout session');
    }
  }

  async getCustomerSubscription(customerId: string) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    return subscriptions;
  }

  async updateStripeData(data: UpdateStripeDto) {
    const user = await this.userService.findByEmail(data.email);

    try {
      await this.userService.updateStripeData({
        email: user.email,
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        stripePriceId: data.stripePriceId,
        stripeSubscriptionStatus: data.stripeSubscriptionStatus,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
