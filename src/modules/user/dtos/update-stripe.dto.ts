import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateStripeDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  stripeCustomerId?: string;

  @IsString()
  @IsOptional()
  stripeSubscriptionId?: string;

  @IsString()
  @IsOptional()
  stripePriceId: string;

  @IsString()
  @IsOptional()
  stripeSubscriptionStatus?: string;
}
