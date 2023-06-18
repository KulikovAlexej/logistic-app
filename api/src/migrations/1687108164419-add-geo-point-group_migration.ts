import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGeoPointGroupMigration1687108164419
  implements MigrationInterface
{
  name = 'AddGeoPointGroupMigration1687108164419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "geo_group_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_a930adf1d965d0e954f95eb9f34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "geo_point" ADD "groupId" integer`);
    await queryRunner.query(
      `ALTER TABLE "geo_point" ADD CONSTRAINT "FK_1f05019f420b36d840bc968d397" FOREIGN KEY ("groupId") REFERENCES "geo_group_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "geo_group_entity" ADD CONSTRAINT "FK_23910e3402b088f4097574a9a10" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "geo_group_entity" DROP CONSTRAINT "FK_23910e3402b088f4097574a9a10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "geo_point" DROP CONSTRAINT "FK_1f05019f420b36d840bc968d397"`,
    );
    await queryRunner.query(`ALTER TABLE "geo_point" DROP COLUMN "groupId"`);
    await queryRunner.query(`DROP TABLE "geo_group_entity"`);
  }
}
