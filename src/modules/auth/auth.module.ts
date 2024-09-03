import { PrismaModule } from 'src/infra/prisma/Prisma.module';
import { JwtModule } from 'src/infra/jwt/Jwt.module';
import { CryptoModule } from 'src/infra/crypto/Crypto.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    CryptoModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
