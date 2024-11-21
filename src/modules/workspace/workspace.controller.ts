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
import { ParamId } from '@/common/decorators/param-id.decorator';
import { UpdateWorkspaceDto } from '@/modules/workspace/dtos/update-workspace.dto';
import { UpdateUserColumnsDto } from '@/modules/workspace/dtos/update-user-columns.dto';
import { DeleteUserFromWorkspaceDto } from '@/modules/workspace/dtos/delete-user-from-workspace.dto';
import { UpdateColumnTasksDto } from '@/modules/workspace/dtos/update-column-tasks.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(@Body() data: CreateWorkspaceDto) {
    return this.workspaceService.create(data);
  }

  @Post('user')
  async deleteUserFromWorkspace(@Body() data: DeleteUserFromWorkspaceDto) {
    return this.workspaceService.deleteUserFromWorkspace(data);
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

  @Patch('user/tasks')
  async updateColumnTasks(@Body() data: UpdateColumnTasksDto) {
    return this.workspaceService.updateColumnTasks(data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.workspaceService.delete(id);
  }
}
