import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    try {
      await this.prisma.task.create({
        data: {
          name: data.name,
          user_id: data.user_id,
          description: data.description,
          workspaceId: data.workspaceId,
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

  async getUserTasks(id: string) {
    try {
      return this.prisma.task.findMany({ where: { user_id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCompletedTaskChartData(user_id: string) {
    const chartData = [];
    const tasks = await this.prisma.task.findMany({
      where: {
        user_id,
      },
    });

    const completedTasks = tasks.filter((t) => t.status === TaskStatus.DONE);

    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };

    for (let i = 0; i <= 11; i++) {
      chartData.push({
        month: months[i],
        tasks: [...completedTasks.filter((t) => t.createdAt.getMonth() === i)]
          .length,
      });
    }

    return chartData;
  }

  async update(id: string, data: UpdateTaskDto) {
    const task = await this.findOne(id);

    try {
      await this.prisma.task.update({
        where: { id },
        data: {
          name: data.name || task.name,
          status: +data.status,
          description: data.description || task.description,
          user_id: task.user_id,
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
