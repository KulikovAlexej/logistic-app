import { Injectable } from '@nestjs/common';

@Injectable()
export class GeoPointsService {
  public getPoints(): string[] {
    return ['point1', 'point2'];
  }
}
