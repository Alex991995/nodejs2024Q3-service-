import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const configService: ConfigService = app.get(ConfigService);
  // const PORT = parseInt(configService.get('PORT')) || 4000;
  app.useGlobalPipes(new ValidationPipe());
  // console.log('listen' + PORT)
  await app.listen(4000);
}
bootstrap();
