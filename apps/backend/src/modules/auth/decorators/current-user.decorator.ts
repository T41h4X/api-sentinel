/** Retrieves the authenticated JWT principal from a protected request. */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest<{ user: JwtPrincipal }>().user,
);
/** Immutable identity propagated by the JWT strategy. */
export interface JwtPrincipal {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];
}
