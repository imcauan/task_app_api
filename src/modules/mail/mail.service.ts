import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '@/modules/mail/dtos/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

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
}
