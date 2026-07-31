/** Prisma lifecycle adapter. Responsibilities: open and close the database connection with NestJS. */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /** Connects Prisma when the application module starts. */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
  /** Closes Prisma cleanly so containers can stop without dropped work. */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
