/**
 * API Sentinel backend entry point.
 * Responsibilities: configure transport concerns before starting the HTTP application.
 * Dependencies: AppModule, global validation, exception and logging providers.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppLogger } from './common/logging/app-logger.service';

/** Starts the HTTP server with platform-wide security and observability defaults. */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(AppLogger);
  app.useLogger(logger);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: process.env.CORS_ORIGIN?.split(',') ?? false, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  const config = new DocumentBuilder()
    .setTitle('API Sentinel')
    .setDescription('Foundation API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  logger.log(`API Sentinel listening on port ${port}`, 'Bootstrap');
}
void bootstrap();
