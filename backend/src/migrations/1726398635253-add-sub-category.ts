import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubCategory1726398635253 implements MigrationInterface {
    name = 'AddSubCategory1726398635253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_item" ADD "subCategory" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_item" DROP COLUMN "subCategory"`);
    }

}
