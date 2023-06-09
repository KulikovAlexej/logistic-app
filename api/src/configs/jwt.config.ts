import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => {
  return { secret: configService.get('JWT_SECRET') };
};
