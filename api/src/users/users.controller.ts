import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // FIXME: удалить. Проверка для настройки доступности сервиса
  @Get('ping')
  public ping(): unknown {
    return { status: 'ok' }
  }

  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getById(+id);
  }

  @Post('create')
  create(@Body() body: Omit<User, 'id' | 'isActive'>): Promise<User> {
    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.patronymic = body.patronymic;
    return this.userService.save(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(+id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() body: User) {
    const requiredUser = await this.userService.getById(+id);

    if (!requiredUser) {
      throw new Error('Такого пользователя нет!');
    }

    return this.userService.save({ ...requiredUser, ...body });
  }
}
