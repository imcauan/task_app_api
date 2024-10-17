import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { UserService } from '../user/user.service';
import { UpdateUserColumnsDto } from './dtos/update-user-columns.dto';
import { Column } from '@prisma/client';

@Injectable()
export class ColumnService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateColumnDto) {
    try {
      const userColumns = await this.findAllUserColumns(data.userId);

      const column = await this.prisma.column.create({
        data: {
          title: `Column ${userColumns.length + 1}`,
          ...data,
        },
      });

      return column;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllUserColumns(userId: string) {
    try {
      return this.prisma.column.findMany({
        where: {
          userId,
        },
        include: {
          tasks: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.column.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const column = await this.prisma.column.findUnique({ where: { id } });

      if (!column) {
        throw new NotFoundException('Column not found!');
      }

      return column;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(data: UpdateColumnDto) {
    try {
      if (!(await this.exists(data.id))) {
        throw new NotFoundException('Column not found!');
      }

      await this.prisma.column.update({
        where: { id: data.id },
        data: { ...data },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUserColumns(id: string, data: UpdateUserColumnsDto) {
    const user = await this.userService.findOne(id);

    console.log(data.columns);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        columns: {
          set: data.columns.map((col) => ({
            ...col,
          })),
        },
      },
    });
  }

  async delete(id: string) {
    try {
      if (!(await this.exists(id))) {
        throw new NotFoundException('Column not found!');
      }

      await this.prisma.column.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async exists(id: string) {
    try {
      if ((await this.prisma.column.count({ where: { id } })) > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
