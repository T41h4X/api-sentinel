/**
 * Shared technical-services module.
 * Responsibilities: expose cross-cutting providers without coupling feature modules to AppModule.
 * Dependencies: AppLogger.
 */
import { Module } from '@nestjs/common';
import { AppLogger } from './logging/app-logger.service';

@Module({ providers: [AppLogger], exports: [AppLogger] })
export class CommonModule {}
