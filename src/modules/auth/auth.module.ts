import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { JwtModule } from '@/infra/jwt/Jwt.module';
import { CryptoModule } from '@/infra/crypto/Crypto.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { StripeModule } from '@/modules/stripe/stripe.module';
import { MailModule } from '@/modules/mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    CryptoModule,
    MailModule,
    StripeModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
