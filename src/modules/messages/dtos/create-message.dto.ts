import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  chatId: string;

  @IsString()
  authorId: string;

  @IsString()
  content: string;
}
