import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  user_id: string;

  @IsString()
  columnId: string;

  @IsString()
  workspaceId?: string;
}
