import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 35000,
  username: 'user',
  password: 'password',
  database: 'logist_app_db',
  entities: ['../**/*.entity.{ts, js}'],
  migrationsTableName: '__migrations',
  migrations: ['../**/migrations/*.{ts, js}'],
});
