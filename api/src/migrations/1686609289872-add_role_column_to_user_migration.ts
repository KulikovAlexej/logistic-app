import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleColumnToUserMigration1686609289872
  implements MigrationInterface
{
  name = 'AddRoleColumnToUserMigration1686609289872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }
}
