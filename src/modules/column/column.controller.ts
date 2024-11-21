import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateColumnDto } from '@/modules/column/dtos/create-column.dto';
import { ColumnService } from '@/modules/column/column.service';
import { ParamId } from '@/common/decorators/param-id.decorator';
import { UpdateColumnDto } from '@/modules/column/dtos/update-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async create(@Body() data: CreateColumnDto) {
    return this.columnService.create(data);
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

  @Delete(':id')
  async delete(@ParamId() id: string) {
    console.log(id);
    return this.columnService.delete(id);
  }
}
