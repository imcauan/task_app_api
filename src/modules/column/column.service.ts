import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { UpdateColumnTasksDto } from './dtos/update-column-tasks.dto';
import { WorkspaceService } from '../workspace/workspace.service';

@Injectable()
export class ColumnService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(data: CreateColumnDto) {
    try {
      const workspace = await this.workspaceService.findOne(data.workspaceId);

      const column = await this.prisma.column.create({
        data: {
          title: `Column ${workspace.columns.length + 1}`,
          order: workspace.columns.length,
          ...data,
        },
        include: {
          tasks: true,
        },
      });

      return column;
    } catch (error) {
      console.log(error);
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
      const column = await this.prisma.column.findUnique({
        where: { id },
        include: { tasks: true },
      });

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

      return this.prisma.column.update({
        where: { id: data.id },
        data: { ...data },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateColumnTasks(data: UpdateColumnTasksDto) {
    const column = await this.findOne(data.id);

    try {
      await this.prisma.column.update({
        where: { id: column.id },
        data: {
          tasks: {
            update: data.tasks.map((task) => ({
              where: { id: task.id },
              data: {
                order: task.order,
                ...task,
              },
            })),
          },
        },
        include: {
          tasks: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    const column = await this.findOne(id);

    if (column.tasks.length > 0) {
      await this.prisma.task.deleteMany({ where: { column_id: column.id } });
    }

    try {
      return this.prisma.column.delete({ where: { id: column.id } });
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
