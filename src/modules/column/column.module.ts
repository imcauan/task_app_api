import { Module } from '@nestjs/common';
import { ColumnService } from '@/modules/column/column.service';
import { ColumnController } from '@/modules/column/column.controller';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [PrismaModule, UserModule, WorkspaceModule],
  controllers: [ColumnController],
  exports: [ColumnService],
  providers: [ColumnService],
})
export class ColumnModule {}
