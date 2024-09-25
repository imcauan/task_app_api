import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/infra/prisma/Prisma.module';
import { FileModule } from '../file/file.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, FileModule, UserModule],
  controllers: [MessageController],
  exports: [MessageService],
  providers: [MessageService],
})
export class MessageModule {}
