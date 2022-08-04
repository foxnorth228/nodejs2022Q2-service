import 'dotenv/config';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { FileLogger } from "./logger/logger";
import { HttpExceptionFilter } from "./logger/http-exception.filter";
import { throwError } from 'rxjs';

let server: INestApplication;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new FileLogger(process.env.LOG_DIR_PATH, 
                           Number.parseInt(process.env.LOG_LEVEL),
    ),
  });
  server = app;
  app.useGlobalFilters(new HttpExceptionFilter());
  const file = readFileSync('doc/api.yaml');
  const yamlBody = parse(file.toString('utf8'));
  const document = SwaggerModule.createDocument(app, yamlBody);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT);
}
bootstrap();

async function sleep(ms: number){
   return new Promise(resolve => setTimeout(resolve, ms));
}

const logger = new Logger();
process.on("unhandledRejection", async (reason, promise) => {
  logger.error("Catch reject");
  console.log("Catch reject");
  await sleep(2500);
  process.exit(1);
});
process.on("uncaughtException", async (err, origin) => {
  logger.error("Catch exception")
  console.log("Catch exception")
  await sleep(2500);
  process.exit(1);
});
