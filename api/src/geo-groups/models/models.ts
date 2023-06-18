import { GeoGroupEntity } from '../geo-group.entity';

// export type CreateGeoGroupDto = Omit<
//   GeoGroupEntity,
//   'id' | 'createdDate' | 'creator' | 'geoPoints'
// >;

export type CreateGeoGroupDto = Pick<GeoGroupEntity, 'name'>;
