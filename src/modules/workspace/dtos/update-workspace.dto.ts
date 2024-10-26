import { CreateWorkspaceDto } from '@/modules/workspace/dtos/create-workspace.dto';

export class UpdateWorkspaceDto extends CreateWorkspaceDto {
  userToDelete: string;
}
