import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { ConfigToken, ServerConfigFactory } from './core';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(RootModule, { logger });

  const configService = app.get(ConfigService);
  const serverConfig = configService.get<ServerConfigFactory>(ConfigToken.SERVER);

  await app.listen(serverConfig.port, serverConfig.host);
}

bootstrap();
