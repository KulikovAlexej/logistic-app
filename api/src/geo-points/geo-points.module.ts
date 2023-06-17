import { Module } from '@nestjs/common';
import { GeoPointsController } from './geo-points.controller';
import { GeoPointsService } from './geo-points.service';

@Module({
  controllers: [GeoPointsController],
  providers: [GeoPointsService],
})
export class GeoPointsModule {}
