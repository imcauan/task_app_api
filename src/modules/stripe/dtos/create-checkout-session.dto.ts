import { IsEmail, IsString } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  userStripeSubscriptionId: string;
}
