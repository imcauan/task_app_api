import { TaskPriority } from '@/modules/tasks/enums/task-priority.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  user_id: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsString()
  columnId: string;

  @IsString()
  workspaceId?: string;
}
