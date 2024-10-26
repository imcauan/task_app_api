import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AuthLoginDto } from '@/modules/auth/dtos/auth-login.dto';

export class AuthRegisterDto extends AuthLoginDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  workspaceId?: string;
}
