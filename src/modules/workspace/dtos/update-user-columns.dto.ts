import { IsArray } from 'class-validator';

export class UpdateUserColumnsDto {
  id: string;

  @IsArray()
  columns: {
    id: string;
    order: number;
  }[];
}
