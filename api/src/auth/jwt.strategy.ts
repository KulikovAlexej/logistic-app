import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtTokenContentModel } from './models/jwt-token-content.model';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'TEST_SECRET',
    });
  }

  async validate(jwtContent: JwtTokenContentModel): Promise<boolean> {
    if (!jwtContent) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
