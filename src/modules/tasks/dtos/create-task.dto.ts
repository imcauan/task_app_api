export type TTaskStatus = 'todo' | 'doing' | 'done';

export class CreateTaskDto {
  name: string;
  description: string;
  user_id: string;
  status: TTaskStatus;
  workspaceId?: string;
}
