import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/register.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  public async register(@Body() body: RegisterDto): Promise<User> {
    const existingUser = await this.authService.findUserByEmail(body.email);

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с данным email уже заведен в системе',
      );
    }

    try {
      return await this.authService.createUser(body);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @HttpCode(200)
  @Post('login')
  public login(@Body() body) {
    return body;
  }
}
