import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { WorkspaceService } from './workspace.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(@Body() data: CreateWorkspaceDto) {
    return this.workspaceService.create(data);
  }

  @Get()
  async findAll() {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.workspaceService.findOne(id);
  }

  @Get('user/:id')
  async getUserWorkspaces(@ParamId() id: string) {
    return this.workspaceService.getUserWorkspaces(id);
  }

  @Patch(':id')
  async update(@ParamId() id: string, @Body() data: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.workspaceService.delete(id);
  }
}
