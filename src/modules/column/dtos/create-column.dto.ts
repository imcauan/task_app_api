import { IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  workspaceId?: string;
}
