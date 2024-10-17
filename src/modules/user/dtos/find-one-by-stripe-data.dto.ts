import { IsString } from 'class-validator';

export class FindOneByStripeDataDto {
  @IsString()
  stripeCustomerId: string;

  @IsString()
  stripeSubscriptionId: string;
}
