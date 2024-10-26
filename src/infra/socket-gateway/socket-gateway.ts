import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '@/modules/messages/dtos/create-message.dto';
import { MessageService } from '@/modules/messages/message.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`User connected => ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected => ${client.id}`);
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: CreateMessageDto) {
    const message = await this.messageService.create(data);

    this.server.emit('onMessage', message);
  }

  @SubscribeMessage('typing')
  async onTyping(@MessageBody() data: any) {
    const isTyping: boolean = true;

    this.server.emit('onTyping', {
      isTyping,
      ...data,
    });
  }
}
