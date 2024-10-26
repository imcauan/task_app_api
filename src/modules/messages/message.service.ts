import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from '@/modules/messages/dtos/create-message.dto';
import { PrismaService } from '@/infra/prisma/Prisma.service';
import { FileService } from '@/modules/file/file.service';
import { UpdateMessageDto } from '@/modules/messages/dtos/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(data: CreateMessageDto, image?: Express.Multer.File) {
    try {
      if (image) {
        this.fileService.uploadPhoto(image);
      }

      await this.prisma.message.create({
        data: {
          chatId: data.chatId,
          authorId: data.authorId,
          content: data.content,
          image: image ? image.filename : null,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.message.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getMessagesByChatId(chatId: string) {
    try {
      return this.prisma.message.findMany({ where: { chatId } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.prisma.message.findUnique({ where: { id } });

      if (!message) {
        throw new NotFoundException('Message not found.');
      }

      return message;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, data: UpdateMessageDto) {
    const message = await this.findOne(id);

    try {
      await this.prisma.message.update({
        where: { id },
        data: {
          authorId: data.authorId ?? message.authorId,
          content: data.content,
          chatId: data.chatId ?? message.chatId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    const message = await this.findOne(id);

    try {
      await this.prisma.message.delete({ where: { id: message.id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
