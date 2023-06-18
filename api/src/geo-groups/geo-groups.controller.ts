import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GeoGroupsService } from './geo-groups.service';
import { CreateGeoGroupDto } from './models/models';
import { UsersService } from '../users/users.service';
import { UserEmailDecorator } from '../auth/decorators/user-email.decorator';
import { GeoGroupEntity } from './geo-group.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('geo-groups')
export class GeoGroupsController {
  constructor(
    private geoGroupsService: GeoGroupsService,
    private userService: UsersService,
  ) {}

  @Get()
  public getGeoGroups(): Promise<GeoGroupEntity[]> {
    return this.geoGroupsService.getGeoGroups();
  }

  @Post('create')
  public async createGeoGroup(
    @Body() body: CreateGeoGroupDto,
    @UserEmailDecorator() creatorEmail: string,
  ): Promise<GeoGroupEntity> {
    const creator = await this.userService.findUserByEmail(creatorEmail);

    if (!creator) {
      throw new Error('Нельзя завести группу точек без привязки к создателю!');
    }

    return this.geoGroupsService.createGroup(body, creator);
  }
}
