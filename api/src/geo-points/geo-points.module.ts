import { Module } from '@nestjs/common';
import { GeoPointsController } from './geo-points.controller';
import { GeoPointsService } from './geo-points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoPointEntity } from './geo-point.entity';
import { UsersModule } from '../users/users.module';
import { GeoGroupsModule } from '../geo-groups/geo-groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeoPointEntity]),
    UsersModule,
    GeoGroupsModule,
  ],
  exports: [TypeOrmModule],
  controllers: [GeoPointsController],
  providers: [GeoPointsService],
})
export class GeoPointsModule {}
