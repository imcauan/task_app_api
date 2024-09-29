import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get('chart/:user_id')
  async getCompletedTaskChartData(@Param('user_id') user_id: string) {
    return this.taskService.getCompletedTaskChartData(user_id);
  }

  @Get('user/:user_id')
  async getUserTasks(@Param('user_id') user_id: string) {
    return this.taskService.getUserTasks(user_id);
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(@ParamId() id: string, @Body() data: UpdateTaskDto) {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.taskService.delete(id);
  }
}
