import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({ secret: 'TEST_SECRET' })], // FIXME: надо забрасывать через .env секреты,
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
