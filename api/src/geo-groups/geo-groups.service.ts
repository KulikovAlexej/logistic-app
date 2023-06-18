import { Injectable } from '@nestjs/common';

@Injectable()
export class GeoGroupsService {
  public getGeoGroups(): string[] {
    return ['group1', 'group2'];
  }
}
