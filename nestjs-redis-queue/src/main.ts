import { NestFactory } from '@nestjs/core';

import { RedisIoAdapter } from '@core/adapters';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.enableCors();
  app.useWebSocketAdapter(redisIoAdapter);
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
