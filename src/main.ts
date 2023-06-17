import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigToken, ServerConfigFactory } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const serverConfig = configService.get<ServerConfigFactory>(ConfigToken.SERVER);

  await app.listen(serverConfig.port, serverConfig.host);
}

bootstrap();
