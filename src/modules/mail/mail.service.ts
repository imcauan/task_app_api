import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '@/modules/mail/dtos/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailForgotPasswordDto } from '@/modules/mail/dtos/send-email-forgot-password.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: SendEmailDto) {
    await this.mailerService.sendMail({
      to: data.email,
      from: 'cauanrodiniz@gmail.com',
      subject: 'Workspace invite',
      template: 'invite-user',
      context: {
        fromUser: data.username,
        workspace: data.workspaceName,
        link: data.workspaceLink,
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
        link: `${process.env.BASE_URL}/reset-password?token=${data.token}`,
      },
    });
  }
}
