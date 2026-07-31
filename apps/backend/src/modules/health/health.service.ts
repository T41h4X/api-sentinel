/** Evaluates database readiness without coupling controllers to Prisma. */
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}
  /** Checks process and database readiness. @returns service status @throws ServiceUnavailableException when database is unreachable */
  async check(): Promise<{ status: 'ok'; timestamp: string }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', timestamp: new Date().toISOString() };
    } catch {
      throw new ServiceUnavailableException('Database is unavailable.');
    }
  }
}
