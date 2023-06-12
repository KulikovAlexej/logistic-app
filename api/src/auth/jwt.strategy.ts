import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtTokenContentModel } from './models/jwt-token-content.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(
    jwtContent: JwtTokenContentModel,
  ): Promise<JwtTokenContentModel> {
    if (!jwtContent) {
      throw new UnauthorizedException();
    }
    return jwtContent;
  }
}
