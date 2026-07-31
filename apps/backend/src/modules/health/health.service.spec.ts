/** Unit tests documenting health service success and failure semantics. */
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service';
describe('HealthService', () => {
  const prisma = { $queryRaw: jest.fn() };
  const service = new HealthService(prisma as never);
  it('returns ok when the database accepts a query', async () => {
    prisma.$queryRaw.mockResolvedValue(1);
    await expect(service.check()).resolves.toMatchObject({ status: 'ok' });
  });
  it('maps database failures to service unavailable', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('down'));
    await expect(service.check()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
