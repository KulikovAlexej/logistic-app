import { GeoPointEntity } from '../geo-point.entity';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export type CreateGeoPointDto = Omit<
  GeoPointEntity,
  'id' | 'createdDate' | 'creator' | 'point'
> &
  Coordinates;
