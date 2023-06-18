import { Module } from '@nestjs/common';
import { GeoGroupsService } from './geo-groups.service';
import { GeoGroupsController } from './geo-groups.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoGroupEntity } from './geo-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoGroupEntity]), UsersModule],
  exports: [TypeOrmModule],
  providers: [GeoGroupsService],
  controllers: [GeoGroupsController],
})
export class GeoGroupsModule {}
