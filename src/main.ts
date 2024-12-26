import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000); // Use port 4000 or any available port
//process.env.PORT ?? 3000);
}
bootstrap();
