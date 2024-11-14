import { WorkspacePriority } from '@/modules/workspace/enums/workspace-priority.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsEnum(WorkspacePriority)
  priority: WorkspacePriority;
}
