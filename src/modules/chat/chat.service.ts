import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dtos/create-chat.dto';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateChatDto) {
    const receiverUser = await this.prisma.user.findUnique({
      where: { id: data.receiverId },
    });
    const senderUser = await this.prisma.user.findUnique({
      where: { id: data.senderId },
    });

    try {
      await this.prisma.chat.create({
        data: {
          members: {
            create: [{ ...senderUser }, { ...receiverUser }],
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
