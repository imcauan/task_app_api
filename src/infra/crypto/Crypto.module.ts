import { Module } from '@nestjs/common';
import { CryptoService } from '@/infra/crypto/Crypto.service';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
