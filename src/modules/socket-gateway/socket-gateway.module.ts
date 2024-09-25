import { Module } from '@nestjs/common';
import { SocketGateway } from './socket-gateway';
import { MessageModule } from '../messages/message.module';

@Module({
  imports: [MessageModule],
  controllers: [],
  exports: [],
  providers: [SocketGateway],
})
export class SocketGatewayModule {}
