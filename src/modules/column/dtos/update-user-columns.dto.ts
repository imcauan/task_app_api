import { Column } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class UpdateUserColumnsDto {
  @IsArray()
  columns: Column[];
}
