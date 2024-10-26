import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { FileService } from '@/modules/file/file.service';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
