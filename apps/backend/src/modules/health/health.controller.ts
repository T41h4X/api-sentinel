/** Readiness endpoint for local development, Docker, and external load balancers. */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  /** Returns application readiness. @returns current service health */
  @Get() @ApiOperation({ summary: 'Check service readiness' }) check() {
    return this.healthService.check();
  }
}
