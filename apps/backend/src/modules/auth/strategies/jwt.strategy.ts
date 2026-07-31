/** Translates a signed access token into the request principal used by guards and controllers. */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPrincipal } from '../decorators/current-user.decorator';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }
  /** Validates already-signed claims. @param payload token claims @returns request principal */ validate(
    payload: JwtPrincipal,
  ): JwtPrincipal {
    return payload;
  }
}
