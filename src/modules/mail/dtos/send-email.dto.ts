import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  workspaceName: string;

  @IsString()
  workspaceLink: string;
}
