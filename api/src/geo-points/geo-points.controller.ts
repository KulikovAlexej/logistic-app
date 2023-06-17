import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GeoPointsService } from './geo-points.service';

@UseGuards(JwtAuthGuard)
@Controller('geo-points')
export class GeoPointsController {
  constructor(private geoPointsService: GeoPointsService) {}

  @Get()
  public getPoints(): string[] {
    return this.geoPointsService.getPoints();
  }
}
