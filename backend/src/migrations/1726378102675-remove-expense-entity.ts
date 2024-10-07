import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveExpenseEntity1726378102675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "expense"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
