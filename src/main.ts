import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { ConfigToken, ServerConfigFactory } from '@/core';
import { RootModule } from '@/root.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(RootModule, { logger });

  const configService = app.get(ConfigService);
  const serverConfig = configService.get<ServerConfigFactory>(ConfigToken.SERVER);

  await app.listen(serverConfig.port, serverConfig.host);
}

bootstrap();
