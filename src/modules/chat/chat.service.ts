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
    const receiverUser = await this.userService.findOne(data.receiverId);
    const senderUser = await this.userService.findOne(data.senderId);

    try {
      await this.prisma.chat.create({
        data: {
          members: {
            create: [
              {
                ...senderUser,
              },
              {
                ...receiverUser,
              },
            ],
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    const chat = await this.prisma.chat.findUnique({ where: { id } });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async findAll() {
    return this.prisma.chat.findMany();
  }

  async delete(id: string) {
    try {
      await this.prisma.chat.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
