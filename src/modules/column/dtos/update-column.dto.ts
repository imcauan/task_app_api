import { IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsString()
  id: string;

  @IsString()
  title?: string;
}
