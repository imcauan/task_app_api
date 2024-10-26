import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.BASE_URL || 'http://localhost:3000',
  });
  await app.listen(port);
}
bootstrap();
