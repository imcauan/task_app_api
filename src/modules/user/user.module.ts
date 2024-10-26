import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '@/infra/prisma/Prisma.module';

import { AuthModule } from '@/modules/auth/auth.module';
import { CryptoModule } from '@/infra/crypto/Crypto.module';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { FileModule } from '@/modules/file/file.module';
import { WorkspaceModule } from '@/modules/workspace/workspace.module';

@Module({
  imports: [
    PrismaModule,
    FileModule,
    WorkspaceModule,
    CryptoModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
