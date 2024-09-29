import { User } from '@prisma/client';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends CreateWorkspaceDto {
  userToDelete: string;
}
