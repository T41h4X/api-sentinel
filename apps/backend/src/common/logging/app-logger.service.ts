/** Structured application logger that prevents ad-hoc console output in production code. */
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  /** Emits an informational event. @param message safe event message @param context event source */
  log(message: string, context?: string): void {
    this.write('log', message, context);
  }
  /** Emits a non-fatal diagnostic event. @param message safe event message @param context event source */
  warn(message: string, context?: string): void {
    this.write('warn', message, context);
  }
  /** Emits an error without exposing it through the HTTP API. @param message safe event message @param trace internal trace @param context event source */
  error(message: string, trace?: string, context?: string): void {
    this.write('error', message, context, trace);
  }
  /** Emits a debug event in development. @param message safe event message @param context event source */
  debug(message: string, context?: string): void {
    if (process.env.NODE_ENV !== 'production') this.write('debug', message, context);
  }
  private write(level: string, message: string, context?: string, trace?: string): void {
    console[level === 'error' ? 'error' : 'log'](
      JSON.stringify({ level, message, context, trace, timestamp: new Date().toISOString() }),
    );
  }
}
