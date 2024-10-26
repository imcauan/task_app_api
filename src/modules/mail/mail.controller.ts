import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from '@/modules/mail/dtos/send-email.dto';
import { MailService } from '@/modules/mail/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() data: SendEmailDto) {
    return this.mailService.sendMail(data);
  }
}
