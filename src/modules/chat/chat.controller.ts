import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateChatDto } from '@/modules/chat/dtos/create-chat.dto';
import { ChatService } from '@/modules/chat/chat.service';
import { ParamId } from '@/common/decorators/param-id.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() data: CreateChatDto) {
    console.log(data);
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

  @Get('user/:user_id')
  async getUserChats(@Param('user_id') user_id: string) {
    return this.chatService.getUserChats(user_id);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.chatService.delete(id);
  }
}
