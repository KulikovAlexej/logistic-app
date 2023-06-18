import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoGroupEntity } from './geo-group.entity';
import { Repository } from 'typeorm';
import { CreateGeoGroupDto } from './models/models';
import { User } from '../users/user.entity';

@Injectable()
export class GeoGroupsService {
  constructor(
    @InjectRepository(GeoGroupEntity)
    private geoGroupRepository: Repository<GeoGroupEntity>,
  ) {}

  public getGeoGroups(): Promise<GeoGroupEntity[]> {
    return this.geoGroupRepository.find();
  }

  public async createGroup(dto: CreateGeoGroupDto, creator: User) {
    const group = new GeoGroupEntity();
    group.name = dto.name;
    group.creator = creator;

    return this.geoGroupRepository.save(group);
  }
}
