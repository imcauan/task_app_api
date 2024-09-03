import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FileService } from './file.service';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
