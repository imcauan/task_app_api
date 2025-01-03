import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/Prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
