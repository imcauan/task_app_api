import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TaskModule } from '@/modules/tasks/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from '@/modules/chat/chat.module';
import { MessageModule } from '@/modules/messages/message.module';
import { SocketGatewayModule } from '@/infra/socket-gateway/socket-gateway.module';
import { WorkspaceModule } from '@/modules/workspace/workspace.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailModule } from '@/modules/mail/mail.module';
import { StripeModule } from '@/modules/stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnModule } from '@/modules/column/column.module';
import { configuration } from '@/common/config/configuration';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    ColumnModule,
    MailModule,
    MessageModule,
    SocketGatewayModule,
    StripeModule,
    TaskModule,
    UserModule,
    WorkspaceModule,
    ConfigModule.forRoot({
      envFilePath: join(`${process.cwd()}/.env.${process.env.NODE_ENV}`),
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'dee.schimmel15@ethereal.email',
          pass: '1CPxZRgU3EPgz5TZRt',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
