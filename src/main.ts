import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('nest js');
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
