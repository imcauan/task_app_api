import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CreateMessageDto } from '@/modules/messages/dtos/create-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MessageService } from '@/modules/messages/message.service';
import { ParamId } from '@/common/decorators/param-id.decorator';
import { UpdateMessageDto } from '@/modules/messages/dtos/update-message.dto';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './storage',
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @Body() data: CreateMessageDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.messageService.create(data, image);
  }

  async findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.messageService.findOne(id);
  }

  @Get('chat/:chatId')
  async getMessagesByChatId(@ParamId() id: string) {
    return this.messageService.getMessagesByChatId(id);
  }

  @Patch(':id')
  async update(@ParamId() id: string, @Body() data: UpdateMessageDto) {
    return this.messageService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.messageService.delete(id);
  }
}
