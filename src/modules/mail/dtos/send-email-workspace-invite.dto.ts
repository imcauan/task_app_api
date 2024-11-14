import { IsEmail, IsString } from 'class-validator';

export class SendEmailWorkspaceInviteDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  workspaceName: string;

  @IsString()
  workspaceId: string;
}
