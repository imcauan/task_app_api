import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { CryptoService } from 'src/infra/crypto/Crypto.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FileService } from '../file/file.service';
import { CreateUserByInviteDto } from './dtos/create-user-by-invite.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(data: CreateUserDto) {
    await this.exists(data.email);
    const hashedPassword = await this.cryptoService.hash(data.password);

    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUserByInvite(data: CreateUserByInviteDto) {
    await this.exists(data.email);

    const hashedPassword = await this.cryptoService.hash(data.password);

    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          workspaces: {
            connect: {
              id: data.workspaceId,
            },
          },
        },
      });
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          workspaces: {
            include: {
              tasks: true,
              members: true,
            },
          },
          chats: {
            include: {
              members: true,
              messages: true,
            },
          },
          tasks: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async exists(email: string) {
    const userExists = await this.prisma.user.count({
      where: { email: { contains: email } },
    });

    console.log(userExists);

    if (userExists > 0) {
      return true;
    }

    return false;
  }

  async update(id: string, { email, name, password }: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: email ?? user.email,
          name: name ?? user.name,
          password: password ?? user.password,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    try {
      await this.prisma.user.delete({ where: { id: user.id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
