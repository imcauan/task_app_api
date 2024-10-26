import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { ChatController } from '@/modules/chat/chat.controller';
import { ChatService } from '@/modules/chat/chat.service';
import { UserModule } from '@/modules/user/user.module';
import { MessageModule } from '@/modules/messages/message.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, MessageModule],
  controllers: [ChatController],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
