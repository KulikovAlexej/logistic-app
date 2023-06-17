import { Module } from '@nestjs/common';
import { GeoPointsController } from './geo-points.controller';
import { GeoPointsService } from './geo-points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoPointEntity } from './geo-point.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GeoPointEntity]), UsersModule],
  exports: [TypeOrmModule],
  controllers: [GeoPointsController],
  providers: [GeoPointsService],
})
export class GeoPointsModule {}
