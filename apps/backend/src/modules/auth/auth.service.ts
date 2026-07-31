/**
 * Authentication application service.
 * Responsibilities: register identities, verify credentials, issue and rotate refresh sessions.
 * Dependencies: repositories, JWT configuration/service, bcrypt, structured logger.
 */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { AppLogger } from '../../common/logging/app-logger.service';
import { RefreshTokensRepository } from '../database/repositories/refresh-tokens.repository';
import { UsersRepository } from '../database/repositories/users.repository';
import { JwtPrincipal } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersRepository,
    private readonly refreshTokens: RefreshTokensRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly logger: AppLogger,
  ) {}
  /** Registers an identity with the default MEMBER role. @param dto validated registration data @returns issued token pair @throws ConflictException when email exists */
  async register(dto: RegisterDto): Promise<AuthTokens> {
    const email = dto.email.toLowerCase();
    if (await this.users.findByEmail(email))
      throw new ConflictException('An account with this email already exists.');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.users.create({
      email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    this.logger.log('User registered', 'AuthService');
    return this.issueTokens({
      sub: user.id,
      email: user.email,
      roles: ['MEMBER'],
      permissions: [],
    });
  }
  /** Verifies credentials and creates a fresh session. @param dto validated login data @returns issued token pair @throws UnauthorizedException when credentials are invalid */
  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.users.findByEmail(dto.email.toLowerCase());
    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash)))
      throw new UnauthorizedException('Invalid email or password.');
    const roles = user.roles.map(({ role }) => role.name);
    const permissions = [
      ...new Set(
        user.roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission.code)),
      ),
    ];
    this.logger.log('User authenticated', 'AuthService');
    return this.issueTokens({ sub: user.id, email: user.email, roles, permissions });
  }
  /** Rotates a valid refresh token, revoking its prior session. @param refreshToken opaque refresh JWT @returns new token pair @throws UnauthorizedException when session is invalid */
  async refresh(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPrincipal & { jti: string }>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
      const session = await this.refreshTokens.findActive(payload.jti);
      if (
        !session ||
        payload.sub !== session.userId ||
        !(await bcrypt.compare(refreshToken, session.tokenHash))
      )
        throw new UnauthorizedException('Invalid refresh token.');
      await this.refreshTokens.revoke(session.tokenId);
      const user = await this.users.findById(payload.sub);
      if (!user?.isActive) throw new UnauthorizedException('Invalid refresh token.');
      return this.issueTokens({ ...payload, roles: user.roles.map(({ role }) => role.name) });
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }
  /** Resolves a user suitable for the current-user endpoint. @param userId identity identifier @returns public user profile @throws UnauthorizedException if deleted */
  async getCurrentUser(userId: string) {
    const user = await this.users.findById(userId);
    if (!user || !user.isActive) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles.map(({ role }) => role.name),
    };
  }
  /** Issues a short-lived access token and a persisted, rotating refresh session. @param principal authenticated identity @returns signed token pair */
  private async issueTokens(principal: JwtPrincipal): Promise<AuthTokens> {
    const accessToken = await this.jwt.signAsync(principal, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.getLifetime('JWT_ACCESS_TTL', '15m'),
    });
    const tokenId = randomUUID();
    const refreshToken = await this.jwt.signAsync(
      { ...principal, jti: tokenId },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.getLifetime('JWT_REFRESH_TTL', '7d'),
      },
    );
    const decoded = this.jwt.decode(refreshToken) as { exp?: number };
    await this.refreshTokens.create(
      principal.sub,
      tokenId,
      await bcrypt.hash(refreshToken, 12),
      new Date((decoded.exp ?? 0) * 1000),
    );
    return { accessToken, refreshToken };
  }
  /** Returns a JWT library-compatible lifetime after configuration has been validated. @param key environment variable name @param fallback local development fallback @returns token lifetime */
  private getLifetime(key: string, fallback: string): SignOptions['expiresIn'] {
    return this.config.get<string>(key, fallback) as SignOptions['expiresIn'];
  }
}
