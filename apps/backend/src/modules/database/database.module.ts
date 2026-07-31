/** Provides a single Prisma connection to all feature modules. */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { RefreshTokensRepository } from './repositories/refresh-tokens.repository';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, RefreshTokensRepository],
  exports: [PrismaService, UsersRepository, RefreshTokensRepository],
})
export class DatabaseModule {}
