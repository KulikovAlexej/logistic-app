import { Module } from '@nestjs/common';
import { GeoGroupsService } from './geo-groups.service';
import { GeoGroupsController } from './geo-groups.controller';

@Module({
  providers: [GeoGroupsService],
  controllers: [GeoGroupsController],
})
export class GeoGroupsModule {}
