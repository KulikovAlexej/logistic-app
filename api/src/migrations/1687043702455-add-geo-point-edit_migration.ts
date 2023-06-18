import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGeoPointEditMigration1687043702455
  implements MigrationInterface
{
  name = 'AddGeoPointEditMigration1687043702455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "geo_point" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD "longitude" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "geo_point" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD "latitude" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "geo_point" ALTER COLUMN "createdDate" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "geo_point" ALTER COLUMN "createdDate" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "geo_point" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD "latitude" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "geo_point" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD "longitude" integer NOT NULL`,
    );
  }
}
