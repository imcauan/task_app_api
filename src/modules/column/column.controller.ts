import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateColumnDto } from '@/modules/column/dtos/create-column.dto';
import { ColumnService } from '@/modules/column/column.service';
import { ParamId } from '@/decorators/param-id.decorator';
import { UpdateColumnDto } from '@/modules/column/dtos/update-column.dto';
import { UpdateColumnTasksDto } from './dtos/update-column-tasks.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async create(@Body() data: CreateColumnDto) {
    return this.columnService.create(data);
  }

  @Get('user/:id')
  async findAllUserColumns(@Param('userId') userId: string) {
    return this.columnService.findAllUserColumns(userId);
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.columnService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @Patch(':id')
  async update(@Body() data: UpdateColumnDto) {
    return this.columnService.update(data);
  }

  @Patch('user/tasks')
  async updateColumnTasks(@Body() data: UpdateColumnTasksDto) {
    console.log(data);
    return this.columnService.updateColumnTasks(data);
  }

  @Patch('tasks/:id')
  async updateColumnTask(@ParamId() id: string, data: UpdateColumnTasksDto) {
    return this.columnService.updateColumnTasks(data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    console.log(id);
    return this.columnService.delete(id);
  }
}
