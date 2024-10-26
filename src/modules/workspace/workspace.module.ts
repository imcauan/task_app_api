import { forwardRef, Module } from '@nestjs/common';
import { WorkspaceController } from '@/modules/workspace/workspace.controller';
import { WorkspaceService } from '@/modules/workspace/workspace.service';
import { PrismaModule } from '@/infra/prisma/Prisma.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), PrismaModule],
  controllers: [WorkspaceController],
  exports: [WorkspaceService],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
