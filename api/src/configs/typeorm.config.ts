import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../users/user.entity';
import { GeoPointEntity } from '../geo-points/geo-point.entity';
import { GeoGroupEntity } from '../geo-groups/geo-group.entity';

export const typeormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE') as string,
    entities: [User, GeoPointEntity, GeoGroupEntity],
    migrationsTableName: '__migrations',
  };
};
