import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/Prisma.module';

import { AuthModule } from '../auth/auth.module';
import { CryptoModule } from 'src/infra/crypto/Crypto.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    PrismaModule,
    FileModule,
    CryptoModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
