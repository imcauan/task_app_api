import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { FileModule } from '@/modules/file/file.module';
import { MessageController } from '@/modules/messages/message.controller';
import { MessageService } from '@/modules/messages/message.service';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, FileModule, UserModule],
  controllers: [MessageController],
  exports: [MessageService],
  providers: [MessageService],
})
export class MessageModule {}
