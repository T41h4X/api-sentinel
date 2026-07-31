/** User persistence boundary. Dependencies: PrismaService. */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  /** Finds an identity with its role and permission graph. @param email normalized email @returns user or null */
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: { include: { permissions: { include: { permission: true } } } } },
        },
      },
    });
  }
  /** Finds an identity by stable identifier. @param id user identifier @returns user or null */
  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }
  /** Creates a user and grants the default MEMBER role atomically. @param data sanitized user data @returns created user */
  async create(
    data: Pick<Prisma.UserCreateInput, 'email' | 'passwordHash' | 'firstName' | 'lastName'>,
  ): Promise<User> {
    const role = await this.prisma.role.findUniqueOrThrow({ where: { name: 'MEMBER' } });
    return this.prisma.user.create({ data: { ...data, roles: { create: { roleId: role.id } } } });
  }
}
