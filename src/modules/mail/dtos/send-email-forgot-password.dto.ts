import { IsString } from 'class-validator';

export class SendEmailForgotPasswordDto {
  @IsString()
  email: string;

  @IsString()
  token?: string;
}
