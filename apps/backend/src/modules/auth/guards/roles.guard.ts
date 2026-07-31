/** Enforces declarative role requirements against the validated JWT principal. */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPrincipal } from '../decorators/current-user.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /** Tests required roles. @param context HTTP execution context @returns true when role requirements are satisfied */ canActivate(
    context: ExecutionContext,
  ): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;
    const user = context.switchToHttp().getRequest<{ user: JwtPrincipal }>().user;
    return required.some((role) => user.roles.includes(role));
  }
}
