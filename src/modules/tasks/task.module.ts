import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/infra/prisma/Prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [TaskController],
  exports: [TaskService],
  providers: [TaskService],
})
export class TaskModule {}
