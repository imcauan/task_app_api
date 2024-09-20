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

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly fileService: FileService,
  ) {}

  async create(image: Express.Multer.File, data: CreateUserDto) {
    if ((await this.prisma.user.count({ where: { email: data.email } })) > 0) {
      throw new ForbiddenException('User already exists!');
    }

    const hashedPassword = await this.cryptoService.hash(data.password);

    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          image: image.filename,
          password: hashedPassword,
        },
      });

      this.fileService.uploadPhoto(image);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
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

  async exists(id: string) {
    if ((await this.prisma.user.count({ where: { id } })) > 0) {
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
