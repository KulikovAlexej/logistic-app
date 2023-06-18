import { Controller, Get } from '@nestjs/common';
import { GeoGroupsService } from './geo-groups.service';

@Controller('geo-groups')
export class GeoGroupsController {
  constructor(private geoGroupsService: GeoGroupsService) {}
  @Get()
  public getGeoGroups(): string[] {
    return this.geoGroupsService.getGeoGroups();
  }
}
