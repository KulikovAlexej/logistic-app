import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { BindPointToGeoGroupDto, CreateGeoPointDto } from './models/models';
import { GeoGroupsService } from '../geo-groups/geo-groups.service';

@UseGuards(JwtAuthGuard)
@Controller('geo-points')
export class GeoPointsController {
  constructor(
    private geoPointsService: GeoPointsService,
    private userService: UsersService,
    private geoGroupService: GeoGroupsService,
  ) {}

  @Get()
  public getPoints(): Promise<GeoPointEntity[]> {
    return this.geoPointsService.getPoints();
  }

  @Get(':id')
  public getById(@Param('id') pointId: number) {
    return this.geoPointsService.getById(pointId);
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

  @Put(':id/bind')
  public async bindToGeoGroup(
    @Param('id') pointId: number,
    @Body() body: BindPointToGeoGroupDto,
  ) {
    const requiredPoint = await this.geoPointsService.getById(pointId);

    if (!requiredPoint) {
      throw new BadRequestException('не найдена точка!');
    }

    const requiredGroup = await this.geoGroupService.getGeoGroupById(
      body.groupId,
    );

    if (!requiredGroup) {
      throw new BadRequestException('не найдена группа!');
    }

    return this.geoPointsService.bindPointToGeoGroup(
      requiredPoint,
      requiredGroup,
    );
  }
}
