import { Module } from '@nestjs/common';
import { ColumnService } from '@/modules/column/column.service';
import { ColumnController } from '@/modules/column/column.controller';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ColumnController],
  exports: [ColumnService],
  providers: [ColumnService],
})
export class ColumnModule {}
