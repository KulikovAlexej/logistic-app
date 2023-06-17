import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGeoPointMigration1687040311158 implements MigrationInterface {
  name = 'AddGeoPointMigration1687040311158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "geo_point" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL, "creatorId" integer, CONSTRAINT "PK_a27bbecb556748cbf21b3d27e58" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD CONSTRAINT "FK_3e80d9ef9b3e1cf2e0d1d2e6d67" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "geo_point" DROP CONSTRAINT "FK_3e80d9ef9b3e1cf2e0d1d2e6d67"`,
    );
    await queryRunner.query(`DROP TABLE "geo_point"`);
  }
}
