import { Module } from '@nestjs/common';
import { TaskService } from '@/modules/tasks/task.service';
import { TaskController } from '@/modules/tasks/task.controller';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ColumnModule],
  controllers: [TaskController],
  exports: [TaskService],
  providers: [TaskService],
})
export class TaskModule {}
