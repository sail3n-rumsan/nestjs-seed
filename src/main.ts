import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('nest js');
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('NestJS Todo App')
    .setDescription('The Realworld API description')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        type: 'apiKey',
        name: 'access_token',
        description: 'Enter access token here',
        in: 'header',
      },
      'access_token',
    ) // This name here is important for matching up with @ApiBearerAuth() in your controller!)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/documentation', app, document);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
  logger.log(
    `Swagger Documentation running at http://localhost:${port}/documentation`,
  );
}
bootstrap();
