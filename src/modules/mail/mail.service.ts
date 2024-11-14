import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailForgotPasswordDto } from '@/modules/mail/dtos/send-email-forgot-password.dto';
import { SendEmailWorkspaceInviteDto } from '@/modules/mail/dtos/send-email-workspace-invite.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendInviteToWorkspaceEmail(data: SendEmailWorkspaceInviteDto) {
    await this.mailerService.sendMail({
      to: data.email,
      from: 'cauanrodiniz@gmail.com',
      subject: 'Workspace invite',
      template: 'invite-user',
      context: {
        username: data.username,
        workspace: data.workspaceName,
        link: `${process.env.BASE_URL}/en/register?workspaceId=${data.workspaceId}`,
      },
    });
  }

  async sendEmailForgotPassword(data: SendEmailForgotPasswordDto) {
    await this.mailerService.sendMail({
      to: data.email,
      from: '123456.hghghghg@gmail.com',
      subject: 'Forgot password',
      template: 'forgot-password',
      context: {
        link: `${process.env.BASE_URL}/en/reset-password?token=${data.token}`,
      },
    });
  }
}
