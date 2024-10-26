import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.BASE_URL || 'http://localhost:3000',
  });
  await app.listen(3333);
}
bootstrap();
