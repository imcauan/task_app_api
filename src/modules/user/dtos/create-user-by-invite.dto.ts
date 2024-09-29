import { CreateUserDto } from './create-user.dto';

export class CreateUserByInviteDto extends CreateUserDto {
  workspaceId: string | undefined;
}
