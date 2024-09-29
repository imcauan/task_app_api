import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { PrismaModule } from 'src/infra/prisma/Prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [WorkspaceController],
  exports: [WorkspaceService],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
