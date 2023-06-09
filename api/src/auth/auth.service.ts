import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtTokenContentModel } from './models/jwt-token-content.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createUser(dto: RegisterDto): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);

    const user = new User();

    user.firstName = '';
    user.lastName = '';
    user.patronymic = '';
    user.email = dto.email;
    user.passwordHash = hashedPassword;

    return this.usersService.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const requiredUser = await this.usersService.findUserByEmail(email);

    if (!requiredUser) {
      return null;
    }

    const isEqualPassword = await this.isEqualPasswordAndHash(
      password,
      requiredUser.passwordHash,
    );

    if (!isEqualPassword) {
      return null;
    }

    return requiredUser;
  }

  isEqualPasswordAndHash(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }

  generateToken(email: string): Promise<string> {
    const payload: JwtTokenContentModel = { email };
    return this.jwtService.signAsync(payload);
  }
}
