import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GeoPointsService } from './geo-points.service';
import { HasRoles } from '../auth/decorators/has-roles.decorator';
import { UserRoles } from '../users/consts/user-roles.enum';
import { JwtRolesGuard } from '../auth/guards/jwt.roles-guard';
import { GeoPointEntity } from './geo-point.entity';
import { UserEmailDecorator } from '../auth/decorators/user-email.decorator';
import { UsersService } from '../users/users.service';
import { CreateGeoPointDto } from './models/models';

@UseGuards(JwtAuthGuard)
@Controller('geo-points')
export class GeoPointsController {
  constructor(
    private geoPointsService: GeoPointsService,
    private userService: UsersService,
  ) {}

  @Get()
  public getPoints(): Promise<GeoPointEntity[]> {
    return this.geoPointsService.getPoints();
  }

  @HasRoles([UserRoles.ADMIN])
  @UseGuards(JwtRolesGuard)
  @Post('create')
  public async createPoint(
    @Body() body: CreateGeoPointDto,
    @UserEmailDecorator() creatorEmail: string,
  ): Promise<GeoPointEntity> {
    const creator = await this.userService.findUserByEmail(creatorEmail);

    if (!creator) {
      throw new BadRequestException(
        'Невозможно создать точку без привязки к пользователю!',
      );
    }

    return this.geoPointsService.createPoint(body, creator);
  }
}
