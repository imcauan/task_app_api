import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from '@/modules/stripe/stripe.service';
import { StripeController } from '@/modules/stripe/stripe.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [StripeController],
  exports: [StripeService],
  providers: [StripeService],
})
export class StripeModule {}
