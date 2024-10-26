import { Module } from '@nestjs/common';
import { SocketGateway } from '@/infra/socket-gateway/socket-gateway';
import { MessageModule } from '@/modules/messages/message.module';

@Module({
  imports: [MessageModule],
  controllers: [],
  exports: [],
  providers: [SocketGateway],
})
export class SocketGatewayModule {}
