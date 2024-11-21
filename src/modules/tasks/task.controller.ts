import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TaskService } from '@/modules/tasks/task.service';
import { CreateTaskDto } from '@/modules/tasks/dtos/create-task.dto';
import { ParamId } from '@/common/decorators/param-id.decorator';
import { UpdateTaskDto } from '@/modules/tasks/dtos/update-task.dto';
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
