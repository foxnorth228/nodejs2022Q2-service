import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { FileLogger } from "./logger/logger";
import { HttpExceptionFilter } from "./logger/http-exception.filter";
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new FileLogger(process.env.LOG_DIR_PATH, 
                           Number.parseInt(process.env.LOG_LEVEL),
    ),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const file = readFileSync('doc/api.yaml');
  const yamlBody = parse(file.toString('utf8'));
  const document = SwaggerModule.createDocument(app, yamlBody);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
