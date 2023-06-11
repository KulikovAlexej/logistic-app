import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
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

    return this.usersRepository.save(user);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  isEqualPasswordAndHash(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }

  generateToken(email: string): Promise<string> {
    return this.jwtService.signAsync(email);
  }
}
