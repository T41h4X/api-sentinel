/** Converts all exceptions to safe, consistent HTTP problem responses and logs unexpected faults. */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../logging/app-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}
  /** Maps a thrown exception to a safe public response. @param exception error to map @param host execution context */
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const detail =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'An unexpected error occurred.';
    if (status >= 500)
      this.logger.error(
        'Unhandled application exception',
        exception instanceof Error ? exception.stack : undefined,
        request.url,
      );
    response.status(status).json({
      statusCode: status,
      message: detail,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
