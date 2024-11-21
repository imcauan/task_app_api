import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/Prisma.service';
import { CreateTaskDto } from '@/modules/tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dtos/update-task.dto';
import { ColumnService } from '../column/column.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly columnService: ColumnService,
  ) {}

  async create(data: CreateTaskDto) {
    const column = await this.columnService.findOne(data.columnId);
    const { tasks } = column;

    try {
      return this.prisma.task.create({
        data: {
          name: data.name,
          members: {
            connect: data.members.map((member) => ({ id: member.id })),
          },
          workspace_id: data.workspaceId,
          order: tasks.length + 1,
          priority: data.priority,
          column_id: data.columnId,
          description: data.description,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.task.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.prisma.task.findUnique({ where: { id } });

      if (!task) {
        throw new NotFoundException('Task not found.');
      }

      return task;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, data: UpdateTaskDto) {
    const task = await this.findOne(id);

    try {
      await this.prisma.task.update({
        where: { id },
        data: {
          name: data.name || task.name,
          description: data.description || task.description,
          members: {
            set: data.members,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
