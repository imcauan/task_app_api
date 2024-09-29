import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() data: SendEmailDto) {
    return this.mailService.sendMail(data);
  }
}
