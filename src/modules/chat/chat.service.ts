import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from '@/modules/chat/dtos/create-chat.dto';
import { PrismaService } from '@/infra/prisma/Prisma.service';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateChatDto) {
    try {
      return this.prisma.chat.create({
        data: {
          members: {
            connect: [{ id: data.senderId }, { id: data.receiverId }],
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: { messages: true, members: true },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async findAll() {
    return this.prisma.chat.findMany();
  }

  async getUserChats(userId: string) {
    const user = await this.userService.findOne(userId);

    try {
      const chats = await this.prisma.chat.findMany({
        include: {
          members: true,
          messages: true,
        },
        where: {
          members: {
            some: {
              id: user.id,
            },
          },
        },
      });

      return chats;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.chat.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
