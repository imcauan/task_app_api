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
import { TaskService } from '@/modules/tasks/task.service';
import { CreateTaskDto } from '@/modules/tasks/dtos/create-task.dto';
import { ParamId } from '@/decorators/param-id.decorator';
import { UpdateTaskDto } from '@/modules/tasks/dtos/update-task.dto';
import { AuthGuard } from '@/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: CreateTaskDto) {
    console.log(data);
    return this.taskService.create(data);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get('chart/:user_id')
  async getCreatedTaskChartData(@Param('user_id') user_id: string) {
    return this.taskService.getCreatedTaskChartData(user_id);
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
