import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from './configs/typeorm.config';
import { GeoPointsModule } from './geo-points/geo-points.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),
    UsersModule,
    AuthModule,
    GeoPointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
