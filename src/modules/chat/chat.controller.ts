import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateChatDto } from './dtos/create-chat.dto';
import { ChatService } from './chat.service';
import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() data: CreateChatDto) {
    return this.chatService.create(data);
  }

  @Get()
  async findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.chatService.findOne(id);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.chatService.delete(id);
  }
}
