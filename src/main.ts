import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exception.filter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  const PORT = parseInt(configService.get('PORT')) || 4000;
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(LoggerService);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addTag('library')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  console.log('Listening on port', PORT);

  process.on('uncaughtException', (err) => {
    logger.error(`[uncaughtException] ${err.message}`);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`[unhandledRejection] ${reason}`);
  });
  await app.listen(PORT);
}
bootstrap();
