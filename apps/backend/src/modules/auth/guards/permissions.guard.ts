/** Enforces declarative permission requirements against the validated JWT principal. */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPrincipal } from '../decorators/current-user.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /** Tests required permissions. @param context HTTP execution context @returns true when all permission requirements are satisfied */ canActivate(
    context: ExecutionContext,
  ): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;
    const user = context.switchToHttp().getRequest<{ user: JwtPrincipal }>().user;
    return required.every((permission) => user.permissions.includes(permission));
  }
}
