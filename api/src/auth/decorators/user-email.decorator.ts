import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtTokenContentModel } from '../models/jwt-token-content.model';

export const UserEmailDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const jwtTokenData: JwtTokenContentModel = request.user;
    return jwtTokenData.email;
  },
);
