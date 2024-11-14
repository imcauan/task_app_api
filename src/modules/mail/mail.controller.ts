import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from '@/modules/mail/mail.service';
import { SendEmailWorkspaceInviteDto } from '@/modules/mail/dtos/send-email-workspace-invite.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() data: SendEmailWorkspaceInviteDto) {
    return this.mailService.sendInviteToWorkspaceEmail(data);
  }
}
