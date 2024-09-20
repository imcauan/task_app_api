import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':user_id')
  async getUserChats(@Param('user_id') user_id: string) {
    return this.chatService.getUserChats(user_id);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.chatService.delete(id);
  }
}
