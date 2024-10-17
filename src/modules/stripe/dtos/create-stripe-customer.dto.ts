import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateStripeCustomerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;
}
