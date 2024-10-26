import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWorkspaceDto } from '@/modules/workspace/dtos/create-workspace.dto';
import { WorkspaceService } from '@/modules/workspace/workspace.service';
import { ParamId } from '@/decorators/param-id.decorator';
import { UpdateWorkspaceDto } from '@/modules/workspace/dtos/update-workspace.dto';
import { UpdateUserColumnsDto } from '../column/dtos/update-user-columns.dto';

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

  @Put('user')
  async updateUserColumns(@Body() data: UpdateUserColumnsDto) {
    return this.workspaceService.updateUserColumns(data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.workspaceService.delete(id);
  }
}
