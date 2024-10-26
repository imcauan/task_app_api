import { CreateUserDto } from '@/modules/user/dtos/create-user.dto';

export class CreateUserByInviteDto extends CreateUserDto {
  workspaceId: string | undefined;
}
