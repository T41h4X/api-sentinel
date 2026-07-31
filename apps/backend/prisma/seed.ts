/** Seeds the stable RBAC vocabulary used by authorization guards. */
import { PrismaClient, RoleName } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  const permissions = ['users:read', 'users:manage'];
  await Promise.all(
    permissions.map((code) =>
      prisma.permission.upsert({ where: { code }, update: {}, create: { code } }),
    ),
  );
  await Promise.all(
    Object.values(RoleName).map((name) =>
      prisma.role.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );
}
main().finally(() => prisma.$disconnect());
