/** Refresh-token persistence boundary. Dependencies: PrismaService. */
import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RefreshTokensRepository {
  constructor(private readonly prisma: PrismaService) {}
  /** Stores only a hash of a refresh token. @param userId owner @param tokenId public session identifier @param tokenHash irreversible token hash @param expiresAt expiry @returns stored session */
  create(
    userId: string,
    tokenId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({ data: { userId, tokenId, tokenHash, expiresAt } });
  }
  /** Returns a usable session by non-secret token identifier. @param tokenId session identifier @returns active session or null */
  findActive(tokenId: string) {
    return this.prisma.refreshToken.findFirst({
      where: { tokenId, revokedAt: null, expiresAt: { gt: new Date() } },
    });
  }
  /** Revokes the matched session to prevent reuse. @param tokenId session identifier @returns affected row count */
  revoke(tokenId: string) {
    return this.prisma.refreshToken.updateMany({
      where: { tokenId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
