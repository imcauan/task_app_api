import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/infra/prisma/Prisma.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [ChatController],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
