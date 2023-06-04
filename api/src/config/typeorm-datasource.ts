import {DataSource, DataSourceOptions} from "typeorm";
import { join } from 'path';

const options = (): DataSourceOptions => {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 35000,
        username: process.env.POSTGRES_USER || 'user',
        password: process.env.POSTGRES_PASSWORD || 'password',
        database: process.env.POSTGRES_DB || 'db',
        schema: 'public',
        logging: true,
        // // migrations: [join(process.cwd(), 'dist', '**', '*.migration.{js,ts}')],
        // migrations: [join(process.cwd(), '**', '*.migration.{js,ts}')],
        // // migrations: [
        // //     "dist/src/migration/*.js"
        // // ],
        //
        // migrationsTableName: 'migrations',
        // entities: [join(process.cwd(), 'dist', '**', '*.entity.{js,ts}')],
        // // entities: [join(process.cwd(), '**', '*.entity.{js,ts}')],
        // migrationsRun: true

        entities: ['../**/*.entity.{ts, js}'],
        migrationsTableName: '__migrations',
        migrations:['../**/migrations/*.{ts, js}']
    }
}

export const dataSource = new DataSource(options())