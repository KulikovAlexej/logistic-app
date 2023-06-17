import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './models/register.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('register')
  public async register(@Body() body: RegisterDto): Promise<User> {
    const existingUser = await this.usersService.findUserByEmail(body.email);

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
  public async login(@Body() body: RegisterDto) {
    const requiredUser = await this.usersService.findUserByEmail(body.email);

    if (!requiredUser) {
      throw new UnauthorizedException(
        'Пользователь с подобной почтой не существует!',
      );
    }

    const isCorrectPassword = await this.authService.isEqualPasswordAndHash(
      body.password,
      requiredUser.passwordHash,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Неверный пароль!');
    }

    return {
      accessToken: await this.authService.generateToken(
        requiredUser.email,
        requiredUser.roles,
      ),
    };
  }
}
