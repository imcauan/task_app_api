import { TaskPriority } from '@/modules/tasks/enums/task-priority.enum';
import { User } from '@prisma/client';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  members: User[];

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsString()
  columnId: string;

  @IsString()
  workspaceId?: string;
}
