import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoPointEntity } from './geo-point.entity';
import { Repository } from 'typeorm';
import { CreateGeoPointDto } from './models/models';
import { User } from '../users/user.entity';

@Injectable()
export class GeoPointsService {
  constructor(
    @InjectRepository(GeoPointEntity)
    private geoPointEntityRepository: Repository<GeoPointEntity>,
  ) {}

  public getPoints(): Promise<GeoPointEntity[]> {
    return this.geoPointEntityRepository.find();
  }

  public createPoint(
    pointDto: CreateGeoPointDto,
    pointCreator: User,
  ): Promise<GeoPointEntity> {
    const geoPoint = new GeoPointEntity();

    geoPoint.name = pointDto.name;
    geoPoint.address = pointDto.address;
    geoPoint.latitude = pointDto.latitude;
    geoPoint.longitude = pointDto.longitude;
    geoPoint.creator = pointCreator;

    return this.geoPointEntityRepository.save(geoPoint);
  }
}
