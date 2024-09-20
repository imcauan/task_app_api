import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/tasks/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './modules/chat/chat.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    TaskModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
